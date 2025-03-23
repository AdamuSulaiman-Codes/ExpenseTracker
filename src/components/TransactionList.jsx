import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";
import { transactionData } from "../assets/routeData";

const TransactionList = () => {
  const transactions = useSelector((state) => state.transaction.transaction);
  const isLoading = useSelector((state) => state.transaction.loading);
  const searchQuery = useSelector((state) => state.transaction.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionAction.toggleLoading(true));

    const fetchTransactions = async () => {
      let storedTransactions = localStorage.getItem("transactions");

      if (storedTransactions) {
        try {
          storedTransactions = JSON.parse(storedTransactions);
          if (!Array.isArray(storedTransactions)) storedTransactions = [];
        } catch (error) {
          console.error("Error parsing transactions from localStorage:", error);
          storedTransactions = [];
        }
      } else {
        storedTransactions = transactionData;
        localStorage.setItem(
          "transactions",
          JSON.stringify(storedTransactions)
        );
      }

      dispatch(transactionAction.setTransactions(storedTransactions));
      dispatch(transactionAction.toggleLoading(false));
    };

    fetchTransactions();
  }, [dispatch]);

  function handleOpenDeleteModal(title, id) {
    dispatch(transactionAction.currentSelectedItem({ title, id }));
    dispatch(transactionAction.openModal("deleteTransaction"));
  }

  const filteredTransactions =
    searchQuery.trim() === ""
      ? transactions
      : transactions.filter((transaction) =>
          transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">Transactions</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(
              (
                transaction,
                index // ✅ Fix applied here
              ) => (
                <tr
                  key={transaction.id || `fallback-${index}`}
                  onClick={() =>
                    handleOpenDeleteModal(transaction.title, transaction.id)
                  }>
                  <td>{transaction.title}</td>
                  <td
                    className={
                      transaction.type === "Expense" ? "expense" : "income"
                    }>
                    {parseFloat(transaction.amount).toLocaleString()}{" "}
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No transaction found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
