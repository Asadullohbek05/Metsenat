import { configureStore } from "@reduxjs/toolkit";
import sponsorReducer from "./sponsorsSlice";
import studentsReducer from "./studentsSlice";

export const store = configureStore({
  reducer: {
    sponsors: sponsorReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
