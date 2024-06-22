import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "../features/state/stateSlice";

export const store = configureStore({
    reducer: {
        state: stateSlice,
    },
})