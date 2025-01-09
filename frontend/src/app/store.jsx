import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '../features/state/stateSlice';
import userReducer from '../features/user/userSlice';
import socialReducer from '../features/social/socialSlice';

const store = configureStore({
  reducer: {
    state: stateReducer,
    user: userReducer,
    social: socialReducer,
  },
});

export default store;
