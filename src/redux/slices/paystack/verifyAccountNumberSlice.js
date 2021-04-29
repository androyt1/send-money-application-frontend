import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../../utils/baseURL';

//Verify Account number
export const verifyAccountNumberAction = createAsyncThunk(
  'account-number-verifield',
  async (account, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/verify-account-number`,
        {
          accountNumber: account && account.accountNumber,
          bankCode: account && account.bankCode,
        },
        {}
      );
      return data;
    } catch (err) {
      //Customise the default error handler
      return rejectWithValue(err.response.data);
    }
  }
);

//Users slice
const accountVerifiedSlice = createSlice({
  name: 'account-number',
  initialState: {},
  extraReducers: {
    //verify acount number
    [verifyAccountNumberAction.pending]: (state, action) => {
      state.loading = true;
    },
    [verifyAccountNumberAction.fulfilled]: (state, action) => {
      state.accountNumberVerified = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    [verifyAccountNumberAction.rejected]: (state, action) => {
      state.error = action?.error?.message;
    },
  },
});

export default accountVerifiedSlice.reducer;
