import { createTheme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1457d9",
      },
      secondary: {
        main: "#2e7d6f",
      },
      background: {
        default: mode === "light" ? "#f7f8fb" : "#101418",
        paper: mode === "light" ? "#ffffff" : "#161b22",
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    },
  });
}
