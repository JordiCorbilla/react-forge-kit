import { Play } from "lucide-react";
import { notifyError, notifyInfo, notifySuccess } from "@forge/notifications";
import { useBackgroundJobsQuery, useStartBackgroundJobMutation } from "@forge/query";
import { useSignalRConnection } from "@forge/signalr";
import { Button, Card, EmptyState, LoadingButton, PageHeader, StatusBadge } from "@forge/ui";

export function JobsPage() {
  const jobs = useBackgroundJobsQuery();
  const startJob = useStartBackgroundJobMutation();
  const realtime = useSignalRConnection();

  const start = () => {
    startJob.mutate("product-report", {
      onSuccess: (job) => {
        notifySuccess("Background job started.");
        realtime.emitMock("JobProgressChanged", {
          jobId: job.id,
          progress: 10,
          status: "running",
          message: "Realtime mock event emitted."
        });
      },
      onError: notifyError
    });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Background Jobs"
        description="Long-running actions return immediately, then progress through polling or realtime events."
        actions={
          <LoadingButton loading={startJob.isPending} onClick={start}>
            <Play className="h-4 w-4" />
            Generate product report
          </LoadingButton>
        }
      />
      <Card>
        {jobs.data?.length ? (
          <div className="space-y-3">
            {jobs.data.map((job) => (
              <div key={job.id} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{job.type}</div>
                    <div className="text-sm text-slate-600">{job.message}</div>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${job.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No jobs yet" description="Start a report to see non-blocking progress." />
        )}
      </Card>
      <Button variant="secondary" onClick={() => notifyInfo("This page listens for mock realtime progress events.")}>
        Show informational toast
      </Button>
    </div>
  );
}
