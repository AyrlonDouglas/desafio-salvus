import { useCallback, useState } from "react";
// REACT-ROUTER
import Routes from "./routes";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
// MUI
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline, PaletteMode } from "@mui/material";
// Redux e sagas
import { Provider } from "react-redux";
import store from "./store";
// Helper e utils
import LOCALSTORAGE from "./helpers/constants/localStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Sidebar from "./components/Sidebar";
import BackdropLoading from "./components/Backdrop";

export default function App() {
  const color = localStorage.getItem(LOCALSTORAGE.colorMode) || "dark";
  const [colorMode, setColorMode] = useState<PaletteMode>(color as PaletteMode);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme(colorMode)}>
        <ToastContainer theme={colorMode} />
        <CssBaseline />
        <BackdropLoading />
        <BrowserRouter>
          <Sidebar>
            <Routes />
          </Sidebar>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
