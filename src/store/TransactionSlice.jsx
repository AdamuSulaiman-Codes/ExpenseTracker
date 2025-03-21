import { createSlice } from "@reduxjs/toolkit";
import { transactionData } from "../assets/routeData";

const initialState = {
  transaction: transactionData,
  modalIsOpen: {},
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addNewTransaction(state, action) {
      state.transaction.push(action.payload);
    },
    openModal(state, action) {
      state.modalIsOpen[action.payload] = true;
    },
    closeModal(state, action) {
      state.modalIsOpen[action.payload] = false;
    },
  },
});

export const transactionReducer = transactionSlice.reducer;
export const transactionAction = transactionSlice.actions;
