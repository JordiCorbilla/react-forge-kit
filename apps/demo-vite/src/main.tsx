import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NotificationsProvider } from "@forge/notifications";
import { QueryProvider } from "@forge/query";
import { SignalRProvider } from "@forge/signalr";
import { routeTree } from "./routes";
import "./styles.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <SignalRProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </SignalRProvider>
    </QueryProvider>
  </React.StrictMode>
);
