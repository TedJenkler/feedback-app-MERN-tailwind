import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "../features/state/stateSlice";
import userSlice from "../features/user/userSlice";
import socialSlice from "../features/social/socialSlice";

export const store = configureStore({
  reducer: {
    state: stateSlice,
    user: userSlice,
    social: socialSlice
  }
});