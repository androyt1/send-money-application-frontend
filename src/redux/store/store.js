import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import banksReducer from '../slices/paystack/getAllBanksSlice';
import accountNumberReducer from '../slices/paystack/verifyAccountNumberSlice';
import transferReceiptReducer from '../slices/paystack/verifyAccountNumberSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    banks: banksReducer,
    accountNumber: accountNumberReducer,
    transferReceipt: transferReceiptReducer,
  },
});
