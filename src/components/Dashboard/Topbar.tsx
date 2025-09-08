"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setDirection,
  toggleMode,
  toggleSidebar,
} from "@/store/slices/uiSlice";

const Topbar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.mode);
  const { t } = useTranslation("common");

  const changeLanguage = (lng: "en" | "fa") => {
    i18next.changeLanguage(lng);
    dispatch(setDirection(lng === "fa" ? "rtl" : "ltr"));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t("dashboard")}
        </Typography>

        <Switch
          checked={mode === "dark"}
          onChange={() => dispatch(toggleMode())}
          color="default"
        />
        <Typography sx={{ mr: 2 }}>{t("darkMode")}</Typography>

        <Button color="inherit" onClick={() => changeLanguage("en")}>
          EN
        </Button>
        <Button color="inherit" onClick={() => changeLanguage("fa")}>
          AR
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
