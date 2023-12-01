import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthStateTypes } from '@/redux/slices/authSlice';

export interface StoreTypes {
  auth: AuthStateTypes;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
