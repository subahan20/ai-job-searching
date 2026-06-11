import { configureStore } from '@reduxjs/toolkit';
import aiSearchReducer from './aiSearchSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    aiSearch: aiSearchReducer,
  },
});
