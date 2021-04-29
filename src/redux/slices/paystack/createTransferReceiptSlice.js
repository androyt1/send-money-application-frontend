import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../../utils/baseURL';

//Verify Account number
export const createTransferReceiptAction = createAsyncThunk(
  'transfer-receipt-created',
  async (account, { rejectWithValue, getState, dispatch }) => {
    console.log('account', account);
    try {
      const { data } = await axios.post(
        `${baseURL}/api/create-transfer-receipt`,
        {
          accountNumber: account && account.accountNumber,
          bankCode: account && account.bankCode,
          name: account && account.name,
          description: account && account.description,
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
  name: 'transfer-receipt',
  initialState: {},
  extraReducers: {
    //verify acount number
    [createTransferReceiptAction.pending]: (state, action) => {
      state.loading = true;
    },
    [createTransferReceiptAction.fulfilled]: (state, action) => {
      state.tranferReceiptCreated = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    [createTransferReceiptAction.rejected]: (state, action) => {
      state.error = action?.error?.message;
    },
  },
});

export default accountVerifiedSlice.reducer;
