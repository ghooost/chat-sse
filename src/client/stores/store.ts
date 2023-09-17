import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { chatSlice } from "./chat";

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
