import create from "zustand";
import { persist } from "zustand/middleware";

interface AppPerisistState {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  usdcEnabled: boolean;
  setUsdcEnabled: (usdcEnabled: boolean) => void;
  usdtEnabled: boolean;
  setUsdtEnabled: (usdtEnabled: boolean) => void;

  filEnabled: boolean;
  setFilEnabled: (filEnabled: boolean) => void;
}

export const usePersistStore = create(
  persist<AppPerisistState>(
    (set) => ({
      sidebarCollapsed: true,
      setSidebarCollapsed: (sidebarCollapsed) =>
        set(() => ({ sidebarCollapsed })),

      usdcEnabled: false,
      setUsdcEnabled: (usdcEnabled) => set(() => ({ usdcEnabled })),

      usdtEnabled: false,
      setUsdtEnabled: (usdtEnabled) => set(() => ({ usdtEnabled })),

      filEnabled: false,
      setFilEnabled: (filEnabled) => set(() => ({ filEnabled })),
    }),

    {
      name: "filend.store",
    }
  )
);

export default usePersistStore;
