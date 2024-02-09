import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../../utils/LocalStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./UserThunk";

const initialState = {
    isLoading: false,
    isSideBarOpen: false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk('user/registerUser', async(user, thnkAPI)=>{
    return registerUserThunk('/registers', user, thnkAPI)
})

export const loginUser = createAsyncThunk('user/loginUser', async(user, thnkAPI)=>{
    return loginUserThunk('/loginusers', user, thnkAPI);
})

export const updateUser = createAsyncThunk('user/updateUser', async(user, thnkAPI)=>{
    return updateUserThunk(`/registers/by-external-reference-code/${thnkAPI.getState().user.user.token}`, user, thnkAPI);
})

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        toggleSidebar: (state)=>{
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        logoutUser: (state, {payload})=>{
            state.user = null;
            state.isSideBarOpen = false;
            removeUserFromLocalStorage();
            if(payload){
                toast.success(payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
            const user = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage({
                name: user.creator.givenName,
                email: user.email, 
                lastName: user.creator.familyName, 
                token: user.externalReferenceCode
            });
            toast.success(`Hello There ${user.creator.givenName}`);
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            const user = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage({
                name: user.creator.givenName,
                email: user.email, 
                lastName: user.creator.familyName, 
                token: user.externalReferenceCode
            });
            toast.success(`Welcome Back ${user.creator.givenName}`);
        })
        .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, { payload }) => {
            const user = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage({
                name: user.creator.givenName,
                email: user.email, 
                lastName: user.creator.familyName, 
                token: user.externalReferenceCode
            });
            toast.success(`User Updated!`);
        })
        .addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        })
    } 
})

export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;