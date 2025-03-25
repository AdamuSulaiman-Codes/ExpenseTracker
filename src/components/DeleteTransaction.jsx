import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";

const DeleteTransaction = () => {
  const selectedItem = useSelector((state) => state.transaction.selectedItem);
  const dispatch = useDispatch();

  // Early return if no transaction is selected
  if (!selectedItem) {
    return <div>No transaction selected for deletion</div>;
  }

  return (
    <div className="delete-transaction">
      <h2>Are you sure you want to delete?</h2>
      <p>{selectedItem.title}</p>
      <div className="delete-actions">
        <button
          onClick={() => {
            dispatch(transactionAction.deleteTransaction(selectedItem.id));
            dispatch(transactionAction.closeModal("deleteTransaction"));
          }}>
          Confirm Delete
        </button>
        <button
          onClick={() => {
            dispatch(transactionAction.closeModal("deleteTransaction"));
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTransaction;
