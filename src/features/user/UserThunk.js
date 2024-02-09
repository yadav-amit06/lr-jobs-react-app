import customFetch from "../../utils/axios";
import { logoutUser } from "./UserSlice";

export const registerUserThunk = async (url, user, thnkAPI) => {
    try {
        const resp = await customFetch.post(url,user,
        {headers: {
			Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			'Content-Type': 'application/json',
		},})
        return resp.data;
    } catch (error) {
        return thnkAPI.rejectWithValue(error.message);
    }
}

export const loginUserThunk = async (url, user, thnkAPI) =>{
    try {
        const resp = await customFetch.post(url, user,
        {headers: {
			Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			'Content-Type': 'application/json',
		},})
        // console.log(resp.data);
        return resp.data;
    } catch (error) {
        // console.log(error);
        return thnkAPI.rejectWithValue(error.message);
    }
}

export const updateUserThunk = async (url, user, thnkAPI) =>{
    try {
        const resp = await customFetch.patch(url, user,
        {headers: {
			Authorization: 'Basic ' + btoa('amit.yadav@liferay.com:test'),
			'Content-Type': 'application/json',
		},})
        return resp.data;
    } catch (error) {
        if(error.response.status === 401){
            thnkAPI.dispatch(logoutUser());
            return thnkAPI.rejectWithValue("Unauthorized! Logging Out...");
        }
        return thnkAPI.rejectWithValue(error.message);
    }
}