import React from "react";
import { useActionState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";

const EditTransaction = () => {
  const selectedItem = useSelector((state) => state.transaction.selectedItem);
  const dispatch = useDispatch();

  function editTransaction(prevState, formData) {
    const title = formData.get("title");
    const amount = formData.get("amount").replace(/,/g, "");
    const type = formData.get("type");
    const category = formData.get("category");
    const date = formData.get("date");

    const editedTransaction = {
      amount: parseFloat(amount),
      type,
      category,
      date,
      id: selectedItem.id,
      title,
    };

    dispatch(transactionAction.editSelectedTransaction(editedTransaction));
    dispatch(transactionAction.closeModal("editTransaction"));
  }

  const formRef = useRef(null);
  const [formState, formAction] = useActionState(editTransaction, null);

  // Early return if no transaction is selected
  if (!selectedItem) {
    return <div>No transaction selected for editing</div>;
  }

  return (
    <form className="transaction-form" action={formAction} ref={formRef}>
      <h2>Edit Transaction</h2>

      <label>Title/Description:</label>
      <input
        type="text"
        name="title"
        placeholder="e.g., Bought groceries"
        defaultValue={selectedItem.title}
        required
      />

      <label>Amount:</label>
      <input
        type="text"
        name="amount"
        placeholder="e.g., 5,000"
        defaultValue={selectedItem.amount}
        required
      />

      <label>Transaction Type:</label>
      <select name="type" defaultValue={selectedItem.type}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <label>Category:</label>
      <select name="category" defaultValue={selectedItem.category}>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Transport">Transport</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>

      <label>Date:</label>
      <input
        type="date"
        name="date"
        defaultValue={
          selectedItem.date || new Date().toISOString().split("T")[0]
        }
      />

      <button type="submit">Update Transaction</button>
      <button
        type="button"
        onClick={() =>
          dispatch(transactionAction.closeModal("editTransaction"))
        }>
        Cancel
      </button>
    </form>
  );
};

export default EditTransaction;
