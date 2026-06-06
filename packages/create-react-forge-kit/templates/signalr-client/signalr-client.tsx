import { SignalRProvider, createSignalRConnection, fromHubConnection } from "@forge/signalr";

const connection = fromHubConnection(createSignalRConnection("/hub/events"));

export function RealtimeBoundary({ children }: { children: React.ReactNode }) {
  return <SignalRProvider connection={connection}>{children}</SignalRProvider>;
}
