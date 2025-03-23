import React, { useRef, useState } from "react";
import { useActionState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";

const AddTransaction = () => {
  const transactions = useSelector((state) => state.transaction.transaction);

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [formattedAmount, setFormattedAmount] = useState("");

  function getFormData(prevState, formData) {
    const title = formData.get("title");
    // Get the raw amount without commas for processing
    const amount = formData.get("amount").replace(/,/g, "");
    const type = formData.get("type");
    const category = formData.get("category");
    const date = formData.get("date");
    const randomId = Math.floor(Math.random() * 10000000000);

    const newTransaction = {
      amount: parseFloat(amount),
      type,
      category,
      date,
      id: randomId,
      title,
    };

    dispatch(transactionAction.addNewTransaction(newTransaction));
    dispatch(transactionAction.closeModal("addTransactions"));

    // Reset the form and formatted amount
    if (formRef.current) {
      formRef.current.reset();
      setFormattedAmount("");
    }

    return null;
  }

  const [formState, formAction] = useActionState(getFormData, null);

  // Format number with commas as thousands separators
  const formatAmount = (value) => {
    // Remove all non-digit characters except the decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Convert to number to handle cases like "000" -> "0"
    const number = parseFloat(numericValue);

    // If number is NaN (empty input), return an empty string
    if (isNaN(number)) return "";

    // Format with commas while preserving the decimal part
    return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formatted = formatAmount(value);
    setFormattedAmount(formatted);
  };

  return (
    <form className="transaction-form" action={formAction} ref={formRef}>
      <h2>Add Transaction</h2>

      <label>Title/Description:</label>
      <input
        type="text"
        name="title"
        placeholder="e.g., Bought groceries"
        required
      />

      <label>Amount:</label>
      <input
        type="text" // Changed from number to text to allow commas
        name="amount"
        placeholder="e.g., 5,000"
        value={formattedAmount}
        onChange={handleAmountChange}
        required
      />

      <label>Transaction Type:</label>
      <select name="type" defaultValue="Expense">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <label>Category:</label>
      <select name="category" defaultValue="Food">
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
        defaultValue={new Date().toISOString().split("T")[0]}
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
