import { createSlice } from '@reduxjs/toolkit';

export interface SplashScreenStateTypes {
  splashScreenActive: boolean;
}

const initialState: SplashScreenStateTypes = {
  splashScreenActive: false,
};

const splashScreenSlice = createSlice({
  name: 'splash screen',
  initialState,
  reducers: {
    setSplashScreenActive: (
      state: SplashScreenStateTypes,
      action: { payload: boolean }
    ) => {
      state.splashScreenActive = action.payload;
    },
  },
});

export const { setSplashScreenActive } = splashScreenSlice.actions;

export default splashScreenSlice.reducer;
