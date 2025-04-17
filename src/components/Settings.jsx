import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionAction } from '../store/TransactionSlice';
import * as XLSX from 'xlsx';
import { FaTrashAlt, FaFileExcel } from 'react-icons/fa';

const Settings = () => {
  const transactions = useSelector((state) => state.transaction.transaction); 
  const dispatch = useDispatch();

  function handleExportToExcel() {
    if (!transactions || transactions.length === 0) {
      alert("No transactions available to export.");
      return;
    }

    const workBookData = transactions.map((transaction) => ({
      ID: transaction.id,
      Title: transaction.title,
      Amount: transaction.amount,
      Type: transaction.type,
      Category: transaction.category,
      Date: transaction.date,
    }));

    const workSheet = XLSX.utils.json_to_sheet(workBookData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Transactions");

    workSheet["!cols"] = [
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
    ];

    const date = new Date().toISOString().split("T")[0];
    const fileName = `transactions_${date}.xlsx`;

    XLSX.writeFile(workBook, fileName);
  }

  function handleClearTransactions() {
    dispatch(transactionAction.clearTransaction());
    alert("All transactions have been cleared.");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Settings</h2>
      <div style={styles.buttonContainer}>
        <button onClick={handleClearTransactions} style={{ ...styles.button, backgroundColor: "#ff4d4f" }}>
          <FaTrashAlt style={styles.icon} />
          Clear Transactions
        </button>
        <button onClick={handleExportToExcel} style={{ ...styles.button, backgroundColor: "#28a745" }}>
          <FaFileExcel style={styles.icon} />
          Export to Excel
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#222831',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  icon: {
    fontSize: '1.2rem',
  },
};

export default Settings;
