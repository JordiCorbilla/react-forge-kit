# SignalR Patterns

The SignalR package exposes a provider, a connection hook, and an event hook. The demo uses a mock connection so it runs without a backend.

To use a real ASP.NET Core hub, create a hub connection with `createSignalRConnection("/hub/events")`, wrap it with `fromHubConnection`, and pass it to `SignalRProvider`.

Typed event names currently include `JobProgressChanged`, `ProductUpdated`, and `NotificationReceived`. New events should be added to the event map before they are used in app code.
