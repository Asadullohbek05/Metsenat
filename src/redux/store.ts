import { configureStore } from "@reduxjs/toolkit";
import sponsorReducer from "./sponsorsSlice";
import studentsReducer from "./studentsSlice";
import sponsorDetailReducer from "./singleSponsorSlice";

export const store = configureStore({
  reducer: {
    sponsors: sponsorReducer,
    sponsorDetails: sponsorDetailReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
