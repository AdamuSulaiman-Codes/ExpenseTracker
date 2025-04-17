import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { Formatter } from "../assets/util";

const IncomeExpenseBarChart = () => {
  const transactions = useSelector(
    (state) => state.transaction.transaction || []
  );

  // Ensure transactions is an array
  const transactionsArray = Array.isArray(transactions) ? transactions : [];

  // Standardize type checking - use lowercase for consistency
  const aggregatedData = transactionsArray.reduce(
    (acc, transaction) => {
      const amount = parseFloat(transaction.amount) || 0;
      // Convert type to lowercase for case-insensitive comparison
      const type = transaction.type?.toLowerCase() || "";
      
      if (type === "income") {
        acc[0].value += amount;
      } else if (type === "expense") {
        acc[1].value += Math.abs(amount);
      }
      return acc;
    },
    [
      { name: "Income", value: 0 },
      { name: "Expense", value: 0 },
    ]
  );

  // If no data, display a message instead of empty chart
  if (transactionsArray.length === 0) {
    return <div>No transaction data available</div>;
  }

  return (
    <div className="chart-container" style={{ width: "70%", height: "250px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aggregatedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${Formatter.format(value)}`} />
          <Bar dataKey="value" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;