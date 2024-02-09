import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async(_, thunkAPI)=>{
    let url = `/jobs`;
    try {
        const resp = await customFetch.get(url, {
            headers: {
                Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			    'Content-Type': 'application/json',
            }
        })
        console.log(resp.data.items);
        return resp.data.items;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error");
    }
})
 
const allJobSlice = createSlice({
    name: 'allJobs',
    initialState, 
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getAllJobs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllJobs.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.jobs = payload;
        })
        .addCase(getAllJobs.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        })
    }
})

export const {showLoading, hideLoading} = allJobSlice.actions;
export default allJobSlice.reducer;