"use client";
import { FC, ReactNode } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/store/hooks";

interface Props {
  children: ReactNode;
}
const DashboarLayout: FC<Props> = ({ children }) => {
  const open = useAppSelector((state) => state.ui.sidebarOpen);
  const drawerWidth = 240;

  return (
    <div className="app-root">
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        className="content"
        sx={{ marginTop: "64px", marginLeft: open ? `${drawerWidth}px` : 0 }}
      >
        {children}
      </Box>
    </div>
  );
};

export default DashboarLayout;
