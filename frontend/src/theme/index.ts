import { PaletteMode } from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";

export default function theme(mode: PaletteMode | undefined) {
  return createTheme({
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {}
        : {
            background: {
              paper: "#1C1C1C",
              default: "#151515",
            },
            primary: { main: "#00C496" },
            secondary: { main: "#008dd5" },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
    },
  });
}
