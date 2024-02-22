import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./slice/editorSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

export default store;
