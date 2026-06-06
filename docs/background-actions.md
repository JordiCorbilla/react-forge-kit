# Background Actions

The report generation example follows this flow:

1. A button enters a pending state.
2. A mutation starts a mock background job.
3. A toast confirms that the job started.
4. The user can continue using the app.
5. The jobs page shows queued and running work.
6. Polling or mock SignalR events update progress.
7. Completion is shown with status and notifications.
8. Query cache entries are invalidated where affected.
9. The button never blocks the whole page.
10. Errors are normalized before they reach the UI.

This is the pattern I reuse for reports, imports, exports, recalculations, and other long-running operations.
