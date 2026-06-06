import {
  HubConnectionBuilder,
  LogLevel,
  type HubConnection,
  type HubConnectionBuilder as SignalRBuilder
} from "@microsoft/signalr";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

export type ConnectionStatus = "idle" | "connecting" | "connected" | "reconnecting" | "disconnected";

export type RealtimeEvents = {
  JobProgressChanged: { jobId: string; progress: number; status: string; message: string };
  ProductUpdated: { productId: string; status: string };
  NotificationReceived: { level: "info" | "success" | "error"; message: string };
};

export interface RealtimeConnection {
  status: ConnectionStatus;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  on: <TEvent extends keyof RealtimeEvents>(
    eventName: TEvent,
    handler: (payload: RealtimeEvents[TEvent]) => void
  ) => () => void;
  emitMock: <TEvent extends keyof RealtimeEvents>(
    eventName: TEvent,
    payload: RealtimeEvents[TEvent]
  ) => void;
}

export function createSignalRConnection(url: string, configure?: (builder: SignalRBuilder) => SignalRBuilder) {
  const builder = configure?.(new HubConnectionBuilder()) ?? new HubConnectionBuilder();
  return builder.withUrl(url).withAutomaticReconnect().configureLogging(LogLevel.Information).build();
}

export function createMockRealtimeConnection(): RealtimeConnection {
  const listeners = new Map<keyof RealtimeEvents, Set<(payload: never) => void>>();
  let status: ConnectionStatus = "idle";

  return {
    get status() {
      return status;
    },
    async start() {
      status = "connected";
    },
    async stop() {
      status = "disconnected";
    },
    on(eventName, handler) {
      const handlers = listeners.get(eventName) ?? new Set();
      handlers.add(handler as (payload: never) => void);
      listeners.set(eventName, handlers);
      return () => handlers.delete(handler as (payload: never) => void);
    },
    emitMock(eventName, payload) {
      listeners.get(eventName)?.forEach((handler) => handler(payload as never));
    }
  };
}

export function fromHubConnection(connection: HubConnection): RealtimeConnection {
  let status: ConnectionStatus = "idle";
  return {
    get status() {
      return status;
    },
    async start() {
      status = "connecting";
      await connection.start();
      status = "connected";
    },
    async stop() {
      await connection.stop();
      status = "disconnected";
    },
    on(eventName, handler) {
      connection.on(eventName, handler);
      return () => connection.off(eventName, handler);
    },
    emitMock() {
      throw new Error("Mock events are not available on a real SignalR connection.");
    }
  };
}

const SignalRContext = createContext<RealtimeConnection | null>(null);

export function SignalRProvider({
  children,
  connection
}: PropsWithChildren<{ connection?: RealtimeConnection }>) {
  const value = useMemo(() => connection ?? createMockRealtimeConnection(), [connection]);
  const [, setStatus] = useState(value.status);

  useEffect(() => {
    void value.start().then(() => setStatus(value.status));
    return () => {
      void value.stop();
    };
  }, [value]);

  return <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>;
}

export function useSignalRConnection() {
  const connection = useContext(SignalRContext);
  if (!connection) {
    throw new Error("useSignalRConnection must be used inside SignalRProvider.");
  }
  return connection;
}

export function useSignalREvent<TEvent extends keyof RealtimeEvents>(
  eventName: TEvent,
  handler: (payload: RealtimeEvents[TEvent]) => void
) {
  const connection = useSignalRConnection();

  useEffect(() => connection.on(eventName, handler), [connection, eventName, handler]);
}
