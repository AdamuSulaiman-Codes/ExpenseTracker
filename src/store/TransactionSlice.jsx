import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: JSON.parse(localStorage.getItem("transactions")) || [],
  modalIsOpen: {},
  loading: true,
  selectedItem: null, // Changed from an object with default values
  searchQuery: "",
  dateFilter: "",
  categoryFilter: "All",
  typeFilter: "All",
  category: JSON.parse(localStorage.getItem("categories")) || [
    "Food",
    "Rent",
    "Transport",
    "Salary",
    "Other",
  ],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setDateFilter(state, action) {
      state.dateFilter = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setTypeFilter(state, action) {
      state.typeFilter = action.payload;
    },
    setTransactions(state, action) {
      state.transaction = Array.isArray(action.payload) ? action.payload : [];
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    addNewTransaction(state, action) {
      state.transaction.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    deleteTransaction(state, action) {
      state.transaction = state.transaction.filter(
        (transaction) => transaction.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    editSelectedTransaction(state, action) {
      state.transaction = state.transaction.map((transact) =>
        transact.id === action.payload.id ? action.payload : transact
      );
      localStorage.setItem("transactions", JSON.stringify(state.transaction));
    },
    toggleLoading(state, action) {
      state.loading = action.payload;
    },
    openModal(state, action) {
      state.modalIsOpen = { ...state.modalIsOpen, [action.payload]: true };
    },
    closeModal(state, action) {
      state.modalIsOpen = { ...state.modalIsOpen, [action.payload]: false };
    },
    currentSelectedItem(state, action) {
      // Ensure we always store the full transaction object
      state.selectedItem =
        action.payload && action.payload.id
          ? action.payload
          : state.transaction.find((t) => t.id === action.payload) || null;
    },
    addCategory(state, action) {
      if (!state.category.includes(action.payload)) {
        state.category.push(action.payload);
        localStorage.setItem("categories", JSON.stringify(state.category));
      }
    },
    removeCategory(state, action){
      const updatedCategory = state.category.filter((cat, index) => action.payload != index)

      state.category = [...updatedCategory]

      localStorage.setItem("categories", JSON.stringify(updatedCategory));
    },
    setCategory(state, action) {
      const categories = action.payload;
      if (Array.isArray(categories)) {
        state.category = categories;
        localStorage.setItem("categories", JSON.stringify(categories));
      } else {
        console.error("Invalid category data:", categories);
      }
    }
  },
});

export const transactionReducer = transactionSlice.reducer;
export const transactionAction = transactionSlice.actions;
