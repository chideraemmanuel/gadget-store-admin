import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthStateTypes } from '@/redux/slices/authSlice';
import splashScreenReducer, {
  SplashScreenStateTypes,
} from './slices/splashScreenSlice';

export interface StoreTypes {
  auth: AuthStateTypes;
  splashScreen: SplashScreenStateTypes;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    splashScreen: splashScreenReducer,
  },
});

export default store;
