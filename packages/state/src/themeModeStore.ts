import { create } from "zustand";

export type ThemeMode = "light" | "dark";

type ThemeModeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

export const useThemeModeStore = create<ThemeModeState>((set) => ({
  mode: "light",
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
}));
