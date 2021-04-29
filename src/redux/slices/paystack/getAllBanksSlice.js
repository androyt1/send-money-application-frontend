import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

// Get All Banks
export const getAllBanksAction = createAsyncThunk(
  'banks-list',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.get(`${baseURL}/api/banks`, config);
      //save user into storage
      return await data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err.response.data);
    }
  }
);

//All Banks slice
const banksSlice = createSlice({
  name: 'banks',
  initialState: {
    allBanks: [],
  },
  extraReducers: {
    // Fetch all banks
    [getAllBanksAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBanksAction.fulfilled]: (state, action) => {
      state.allBanks = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    [getAllBanksAction.rejected]: (state, action) => {
      state.error = action?.error?.message;
    },
  },
});

export default banksSlice.reducer;
