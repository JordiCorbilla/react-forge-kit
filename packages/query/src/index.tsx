import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import {
  mockApiClient,
  normalizeError,
  type ApiClient,
  type BackgroundJob,
  type Product,
  type ProductFilters,
  type ProductPage,
  type ProductStatus
} from "@forge/api";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters: ProductFilters) => [...queryKeys.products.all, "list", filters] as const,
    detail: (productId: string) => [...queryKeys.products.all, "detail", productId] as const
  },
  jobs: {
    all: ["jobs"] as const,
    list: () => [...queryKeys.jobs.all, "list"] as const,
    detail: (jobId: string) => [...queryKeys.jobs.all, "detail", jobId] as const
  }
};

export const apiClientContext = {
  current: mockApiClient
};

export function setApiClient(client: ApiClient) {
  apiClientContext.current = client;
}

export function createForgeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: (failureCount, error) => normalizeError(error).recoverable && failureCount < 2
      },
      mutations: {
        retry: 0
      }
    }
  });
}

export function QueryProvider({ children, client }: PropsWithChildren<{ client?: QueryClient }>) {
  return <QueryClientProvider client={client ?? createForgeQueryClient()}>{children}</QueryClientProvider>;
}

export function useProductsQuery(filters: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: ({ signal }) => apiClientContext.current.getProducts(filters, { signal })
  });
}

export function useProductQuery(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: ({ signal }) => apiClientContext.current.getProductById(productId, { signal })
  });
}

export function useUpdateProductStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: ProductStatus }) =>
      apiClientContext.current.updateProductStatus(productId, status),
    onMutate: async ({ productId, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products.all });
      const previousLists = queryClient.getQueriesData<ProductPage>({
        queryKey: queryKeys.products.all
      });
      const previousDetail = queryClient.getQueryData<Product>(queryKeys.products.detail(productId));

      queryClient.setQueriesData<ProductPage>({ queryKey: queryKeys.products.all }, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((product) =>
                product.id === productId ? { ...product, status } : product
              )
            }
          : old
      );
      queryClient.setQueryData<Product>(queryKeys.products.detail(productId), (old) =>
        old ? { ...old, status } : old
      );

      return { previousLists, previousDetail };
    },
    onError: (_error, variables, context) => {
      context?.previousLists.forEach(([key, data]) => queryClient.setQueryData(key, data));
      queryClient.setQueryData(queryKeys.products.detail(variables.productId), context?.previousDetail);
    },
    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.productId) });
    }
  });
}

export function useStartBackgroundJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type: BackgroundJob["type"]) => apiClientContext.current.startBackgroundJob(type),
    onSuccess: (job) => {
      queryClient.setQueryData<BackgroundJob[]>(queryKeys.jobs.list(), (jobs = []) => [job, ...jobs]);
      void queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    }
  });
}

export function useBackgroundJobQuery(jobId: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(jobId),
    queryFn: ({ signal }) => apiClientContext.current.getBackgroundJob(jobId, { signal }),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "queued" || status === "running" ? 1_000 : false;
    }
  });
}

export function useBackgroundJobsQuery() {
  return useQuery({
    queryKey: queryKeys.jobs.list(),
    queryFn: ({ signal }) => apiClientContext.current.getBackgroundJobs({ signal }),
    refetchInterval: (query) =>
      query.state.data?.some((job) => job.status === "queued" || job.status === "running")
        ? 1_000
        : false
  });
}
