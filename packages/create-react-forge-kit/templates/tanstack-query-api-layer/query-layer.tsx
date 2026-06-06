import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ApiQueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function useExampleQuery() {
  return useQuery({
    queryKey: ["example"],
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/example", { signal });
      if (!response.ok) {
        throw new Error("Example request failed");
      }
      return response.json() as Promise<{ id: string; name: string }[]>;
    }
  });
}
