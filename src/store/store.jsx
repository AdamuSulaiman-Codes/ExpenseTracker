import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./TransactionSlice";

const store = configureStore({
  reducer: { transaction: transactionReducer },
});

export default store;
