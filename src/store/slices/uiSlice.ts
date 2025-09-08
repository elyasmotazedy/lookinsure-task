import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarOpen: boolean;
  mode: "light" | "dark";
  direction: "ltr" | "rtl";
}

const initialState: UiState = {
  sidebarOpen: true,
  mode: "light",
  direction: "ltr",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setDirection(state, action: PayloadAction<"ltr" | "rtl">) {
      state.direction = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar, toggleMode, setDirection } =
  uiSlice.actions;
export default uiSlice.reducer;
