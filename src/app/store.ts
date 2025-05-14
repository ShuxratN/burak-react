import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePage from "./screens/homePage";
import HomePageReducer from "./screens/homePage/slice";
import { getDefaultCompilerOptions } from "typescript";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  middleware: (getGetDefaultMiddleware) => 
    // @ts-ignore
    getGetDefaultMiddleware().concat(),
  reducer: {
    homePage: HomePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
