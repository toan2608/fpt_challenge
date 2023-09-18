// import userReducer from '../api/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/Auth/AuthSlice';
export const store = configureStore({
  reducer: {
      authSlice
  }
})