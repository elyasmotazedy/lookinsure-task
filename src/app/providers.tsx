"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import { useAppSelector } from "@/store/hooks";
import { store } from "@/store";

const ThemedProvider = ({ children }: { children: ReactNode }) => {
  const mode = useAppSelector((state) => state.ui.mode);
  const direction = useAppSelector((state) => state.ui.direction);

  const theme = createTheme({
    direction,
    palette: {
      mode,
      primary: { main: "#1976d2" },
    },
  });

  const cache = createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemedProvider>{children}</ThemedProvider>
      </I18nextProvider>
    </Provider>
  );
};
export default Providers;
