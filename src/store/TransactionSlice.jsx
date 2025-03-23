import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: [],
  modalIsOpen: {},
  loading: true,
  selectedItem: { title: "", id: 0 },
  filteredTransaction: [],
  searchQuery: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    currentSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    addNewTransaction(state, action) {
      state.transaction.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    openModal(state, action) {
      state.modalIsOpen[action.payload] = true;
    },
    closeModal(state, action) {
      state.modalIsOpen[action.payload] = false;
    },
    toggleLoading(state, action) {
      state.loading = action.payload;
    },
    setTransactions(state, action) {
      state.transaction = Array.isArray(action.payload) ? action.payload : [];
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    deleteTransaction(state, action) {
      state.transaction = state.transaction.filter(
        (transaction) => transaction.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    filterTransaction(state, action) {},
  },
});

export const transactionReducer = transactionSlice.reducer;
export const transactionAction = transactionSlice.actions;
