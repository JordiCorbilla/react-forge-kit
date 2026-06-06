import { useCallback, useState } from "react";
import { notifyInfo } from "@forge/notifications";
import { useSignalRConnection, useSignalREvent } from "@forge/signalr";
import { Button, Card, PageHeader, StatusBadge } from "@forge/ui";

export function RealtimePage() {
  const connection = useSignalRConnection();
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = useCallback((message: string) => setEvents((items) => [message, ...items].slice(0, 8)), []);

  useSignalREvent("JobProgressChanged", (payload) => {
    addEvent(`${payload.jobId}: ${payload.progress}% ${payload.message}`);
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="SignalR Client"
        description="Provider and hooks work with a real hub or the mock event bus used by this demo."
        actions={<StatusBadge status={connection.status} />}
      />
      <Card className="space-y-3">
        <Button
          onClick={() => {
            connection.emitMock("JobProgressChanged", {
              jobId: "job-demo",
              progress: 50,
              status: "running",
              message: "Half way through."
            });
            notifyInfo("Mock SignalR event emitted.");
          }}
        >
          Emit mock progress event
        </Button>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event} className="rounded-md border border-slate-200 bg-slate-50 p-2 text-sm">
              {event}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
