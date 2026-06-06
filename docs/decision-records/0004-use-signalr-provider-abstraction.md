# 0004 Use SignalR Provider Abstraction

I hide realtime connection details behind a provider and typed event hooks. The same UI can run against a mock event bus locally or a real ASP.NET Core SignalR hub later.
