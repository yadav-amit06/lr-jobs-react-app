import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/user/UserSlice";
import jobSlice from "./features/jobs/jobSlice";
import allJobSlice from "./features/allJobs/allJobSlice";

export const store = configureStore({
    reducer: {
        user: UserSlice,
        job: jobSlice,
        allJobs: allJobSlice
    }
})