import { Toaster, toast } from "sonner";
import type { ReactNode } from "react";
import { normalizeError } from "@forge/api";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors closeButton position="bottom-right" />
    </>
  );
}

export const notifySuccess = (message: string) => toast.success(message);
export const notifyInfo = (message: string) => toast.info(message);
export const notifyError = (error: unknown) => toast.error(normalizeError(error).userMessage);

export function notifyPromise<T>(promise: Promise<T>, messages: { loading: string; success: string }) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (error) => normalizeError(error).userMessage
  });
}
