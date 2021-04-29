import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';

//Register User
export const registerUserAction = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/users/register`,
        userData,
        config
      );
      //save user into storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return await data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err.response.data);
    }
  }
);

//Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userLogin: {},
    myProfile: {},
  },
  extraReducers: {
    // Register User
    [registerUserAction.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUserAction.fulfilled]: (state, action) => {
      state.userLogin = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    [registerUserAction.rejected]: (state, action) => {
      state.error = action.payload?.message;
    },
  },
});

export default usersSlice.reducer;
