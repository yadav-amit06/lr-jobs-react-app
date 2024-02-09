import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/UserSlice";
import { getUserFromLocalStorage } from "../../utils/LocalStorage";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobSlice";
const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    jobStatus: 'pending',
    isEditing: false,
    editJobId: '',
};

export const createJobs = createAsyncThunk('job/createJob', async(job,thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job,{
            headers: {
                Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			    'Content-Type': 'application/json',
            }
        })
        thunkAPI.dispatch(clearValues);
        return resp.data;
    } catch (error) {
        if(error.response.status === 401){
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
        }
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteJob = createAsyncThunk('job/deleteJob', async(jobId, thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    console.log(jobId);
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`,{
            headers: {
                Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			    'Content-Type': 'application/json',
            }
        })
        thunkAPI.dispatch(getAllJobs());
        return resp.data.items;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.message);
    }
})

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            state[name] = value;
        },
        clearValues: () => {
            return {...initialState, jobLocation:getUserFromLocalStorage()?.location || ""};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createJobs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createJobs.fulfilled, (state) => {
            state.isLoading = false;
            toast.success('Job Created');
        })
        .addCase(createJobs.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(deleteJob.fulfilled, (state) => {
            toast.success('Success! Job Deleted');
        })
        .addCase(deleteJob.rejected, (state, {payload}) => {
            toast.error(payload);
        })
    }
});

export const {handleChange, clearValues} = jobSlice.actions;

export default jobSlice.reducer;