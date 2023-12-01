import { createSlice } from '@reduxjs/toolkit';

export interface AuthStateTypes {
  admin: any;
}

const initialState: AuthStateTypes = {
  admin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin: (state: AuthStateTypes, action: { payload: any }) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = authSlice.actions;

export default authSlice.reducer;
