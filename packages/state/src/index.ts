import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Density = "compact" | "comfortable";
export type ThemePreference = "light" | "dark" | "system";

type AppShellState = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
};

type ProductSelectionState = {
  selectedProductIds: string[];
  setSelectedProductIds: (ids: string[]) => void;
  clearSelection: () => void;
};

type UserPreferencesState = {
  density: Density;
  theme: ThemePreference;
  recentlyViewedProductIds: string[];
  setDensity: (density: Density) => void;
  setTheme: (theme: ThemePreference) => void;
  markProductViewed: (productId: string) => void;
};

export const useAppShellStore = create<AppShellState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed })
    }),
    { name: "forge-app-shell" }
  )
);

export const useProductSelectionStore = create<ProductSelectionState>((set) => ({
  selectedProductIds: [],
  setSelectedProductIds: (selectedProductIds) => set({ selectedProductIds }),
  clearSelection: () => set({ selectedProductIds: [] })
}));

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      density: "comfortable",
      theme: "system",
      recentlyViewedProductIds: [],
      setDensity: (density) => set({ density }),
      setTheme: (theme) => set({ theme }),
      markProductViewed: (productId) =>
        set((state) => ({
          recentlyViewedProductIds: [
            productId,
            ...state.recentlyViewedProductIds.filter((id) => id !== productId)
          ].slice(0, 6)
        }))
    }),
    { name: "forge-user-preferences" }
  )
);
