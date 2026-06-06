export type ProductStatus = "active" | "draft" | "archived";
export type JobStatus = "queued" | "running" | "completed" | "failed";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  status: ProductStatus;
  price: number;
  inventory: number;
  rating: number;
  updatedAt: string;
};

export type BackgroundJob = {
  id: string;
  type: "product-report" | "inventory-sync";
  status: JobStatus;
  progress: number;
  createdAt: string;
  completedAt?: string;
  message: string;
};

export type ProductFilters = {
  search?: string;
  status?: ProductStatus | "all";
  page?: number;
  pageSize?: number;
};

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type AppError = {
  name: "AppError";
  code: string;
  userMessage: string;
  diagnosticMessage: string;
  recoverable: boolean;
};

export type RequestOptions = {
  signal?: AbortSignal;
};

export interface ApiClient {
  getProducts(filters?: ProductFilters, options?: RequestOptions): Promise<ProductPage>;
  getProductById(productId: string, options?: RequestOptions): Promise<Product>;
  updateProductStatus(
    productId: string,
    status: ProductStatus,
    options?: RequestOptions
  ): Promise<Product>;
  startBackgroundJob(type: BackgroundJob["type"], options?: RequestOptions): Promise<BackgroundJob>;
  getBackgroundJob(jobId: string, options?: RequestOptions): Promise<BackgroundJob>;
  getBackgroundJobs(options?: RequestOptions): Promise<BackgroundJob[]>;
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return {
      name: "AppError",
      code: "request_aborted",
      userMessage: "The request was cancelled.",
      diagnosticMessage: error.message,
      recoverable: true
    };
  }

  if (error instanceof Error) {
    return {
      name: "AppError",
      code: "unexpected_error",
      userMessage: "Something went wrong. Try again.",
      diagnosticMessage: error.message,
      recoverable: true
    };
  }

  return {
    name: "AppError",
    code: "unknown_error",
    userMessage: "Something went wrong. Try again.",
    diagnosticMessage: String(error),
    recoverable: true
  };
}

function isAppError(error: unknown): error is AppError {
  return Boolean(error && typeof error === "object" && "name" in error && error.name === "AppError");
}

function notFound(entity: string, id: string): AppError {
  return {
    name: "AppError",
    code: "not_found",
    userMessage: `${entity} could not be found.`,
    diagnosticMessage: `${entity} with id "${id}" was not found in the mock store.`,
    recoverable: false
  };
}

const categories = ["Hardware", "Software", "Services", "Accessories"];

const initialProducts: Product[] = Array.from({ length: 42 }, (_, index) => {
  const id = `product-${index + 1}`;
  const status: ProductStatus = index % 7 === 0 ? "archived" : index % 3 === 0 ? "draft" : "active";
  return {
    id,
    sku: `SKU-${String(index + 1).padStart(4, "0")}`,
    name: `Demo Product ${index + 1}`,
    category: categories[index % categories.length],
    status,
    price: 20 + index * 3,
    inventory: 8 + index * 4,
    rating: Number((3.4 + (index % 16) / 10).toFixed(1)),
    updatedAt: new Date(Date.UTC(2026, 4, 1 + (index % 28), 9, index)).toISOString()
  };
});

const delay = async (signal?: AbortSignal, ms = 220) => {
  if (signal?.aborted) {
    throw new DOMException("Request aborted", "AbortError");
  }

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true }
    );
  });
};

export function createMockApiClient(seedProducts: Product[] = initialProducts): ApiClient {
  let products = [...seedProducts];
  let jobs: BackgroundJob[] = [];

  const tickJobs = () => {
    jobs = jobs.map((job) => {
      if (job.status === "completed" || job.status === "failed") {
        return job;
      }

      const progress = Math.min(100, job.progress + 20);
      return {
        ...job,
        status: progress >= 100 ? "completed" : "running",
        progress,
        completedAt: progress >= 100 ? new Date().toISOString() : undefined,
        message: progress >= 100 ? "Report is ready." : "Generating report..."
      };
    });
  };

  return {
    async getProducts(filters = {}, options) {
      await delay(options?.signal);
      const page = Math.max(1, filters.page ?? 1);
      const pageSize = Math.max(1, filters.pageSize ?? 10);
      const search = filters.search?.trim().toLowerCase();
      const filtered = products.filter((product) => {
        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.sku.toLowerCase().includes(search);
        const matchesStatus =
          !filters.status || filters.status === "all" || product.status === filters.status;
        return matchesSearch && matchesStatus;
      });

      return {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        total: filtered.length,
        page,
        pageSize
      };
    },
    async getProductById(productId, options) {
      await delay(options?.signal);
      const product = products.find((item) => item.id === productId);
      if (!product) {
        throw notFound("Product", productId);
      }
      return product;
    },
    async updateProductStatus(productId, status, options) {
      await delay(options?.signal);
      const existing = products.find((item) => item.id === productId);
      if (!existing) {
        throw notFound("Product", productId);
      }

      const updated = { ...existing, status, updatedAt: new Date().toISOString() };
      products = products.map((item) => (item.id === productId ? updated : item));
      return updated;
    },
    async startBackgroundJob(type, options) {
      await delay(options?.signal, 180);
      const job: BackgroundJob = {
        id: `job-${jobs.length + 1}`,
        type,
        status: "queued",
        progress: 0,
        createdAt: new Date().toISOString(),
        message: "Job queued."
      };
      jobs = [job, ...jobs];
      return job;
    },
    async getBackgroundJob(jobId, options) {
      await delay(options?.signal, 120);
      tickJobs();
      const job = jobs.find((item) => item.id === jobId);
      if (!job) {
        throw notFound("Background job", jobId);
      }
      return job;
    },
    async getBackgroundJobs(options) {
      await delay(options?.signal, 120);
      tickJobs();
      return jobs;
    }
  };
}

export const mockApiClient = createMockApiClient();
