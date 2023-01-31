import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notesReducer from "./notesReducer";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
