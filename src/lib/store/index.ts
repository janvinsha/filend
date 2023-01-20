import create from "zustand";

interface AppState {
  userSigNonce: number;

  setUserSigNonce: (userSigNonce: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userSigNonce: 0,

  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce })),
}));

export default useAppStore;
