import create from "zustand";
import { persist } from "zustand/middleware";

interface AppPerisistState {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const usePersistStore = create(
  persist<AppPerisistState>(
    (set) => ({
      sidebarCollapsed: true,
      setSidebarCollapsed: (sidebarCollapsed) =>
        set(() => ({ sidebarCollapsed })),
    }),
    {
      name: "filend.store",
    }
  )
);

export default usePersistStore;
