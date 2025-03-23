import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";

const DeleteTransaction = () => {
  const selectedItem = useSelector((state) => state.transaction.selectedItem);
  const dispatch = useDispatch();

  return (
    <div className="delete-transaction">
      <h2>Are you sure you want to delete???</h2>
      <p>{selectedItem.title}</p>
      <button
        onClick={() => {
          dispatch(transactionAction.deleteTransaction(selectedItem.id));
          dispatch(transactionAction.closeModal("deleteTransaction"));
        }}>
        Delete
      </button>
    </div>
  );
};

export default DeleteTransaction;
