import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postSlice } from "../../features/post/postSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    post: postSlice.reducer,
    account: accountSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;