import { useSelector, useDispatch } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";
import { useEffect, useMemo } from "react";
import { Formatter } from "../assets/util";
import { transactionData } from "../assets/routeData";

const TransactionList = () => {
  const transactions = useSelector(
    (state) => state.transaction.transaction || []
  );
  const isLoading = useSelector((state) => state.transaction.loading);
  const searchQuery = useSelector((state) => state.transaction.searchQuery);
  const dateFilter = useSelector((state) => state.transaction.dateFilter);
  const categoryFilter = useSelector(
    (state) => state.transaction.categoryFilter
  );
  const typeFilter = useSelector((state) => state.transaction.typeFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionAction.toggleLoading(true));

        // In TransactionList.js useEffect
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        if (Array.isArray(parsedCategories)) {
          dispatch(transactionAction.setCategory(parsedCategories));
        }
      } catch (error) {
        console.error("Error parsing categories from localStorage:", error);
      }
    }

    const fetchTransactions = async () => {
      try {
        let storedTransactions = localStorage.getItem("transactions");

        if (storedTransactions) {
          try {
            storedTransactions = JSON.parse(storedTransactions);

            // Ensure storedTransactions is an array and has valid transactions
            storedTransactions = Array.isArray(storedTransactions)
              ? storedTransactions.filter(
                  (t) => t && typeof t === "object" && t.id && t.title
                )
              : [];
          } catch (error) {
            console.error(
              "Error parsing transactions from localStorage:",
              error
            );
            storedTransactions = [];
          }
        }

        // If no stored transactions, use default data
        if (storedTransactions.length === 0) {
          storedTransactions = transactionData;
          localStorage.setItem(
            "transactions",
            JSON.stringify(storedTransactions)
          );
        }

        dispatch(transactionAction.setTransactions(storedTransactions));
      } catch (error) {
        console.error("Error fetching transactions:", error);
        dispatch(transactionAction.setTransactions([]));
      } finally {
        dispatch(transactionAction.toggleLoading(false));
      }
    };

    fetchTransactions();
  }, [dispatch]);

  function handleOpenDeleteModal(transaction) {
    if (transaction && transaction.id) {
      dispatch(transactionAction.currentSelectedItem(transaction));
      dispatch(transactionAction.openModal("deleteTransaction"));
    }
  }

  // Memoized filtered transactions for performance
  const filteredTransactions = useMemo(() => {
    return (transactions || []).filter((transaction) => {
      // Ensure transaction is valid
      if (!transaction || typeof transaction !== "object") return false;

      const matchesSearch =
        !searchQuery ||
        transaction.title?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = !dateFilter || transaction.date === dateFilter;

      const matchesCategory =
        categoryFilter === "All" || transaction.category === categoryFilter;

      const matchesType =
        typeFilter === "All" || transaction.type === typeFilter;

      return matchesSearch && matchesDate && matchesCategory && matchesType;
    });
  }, [transactions, searchQuery, dateFilter, categoryFilter, typeFilter]);

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => {
              // Additional safety check
              if (!transaction || !transaction.id) return null;

              return (
                <tr key={transaction.id} className="transaction-row">
                  <td>{transaction.title || "Untitled"}</td>
                  <td
                    className={
                      transaction.type === "Expense" ? "expense" : "income"
                    }>
                    {Formatter.format(parseFloat(transaction.amount) || 0)}
                  </td>
                  <td>{transaction.type || "Unspecified"}</td>
                  <td>{transaction.category || "Uncategorized"}</td>
                  <td>{transaction.date || "No Date"}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteModal(transaction);
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
