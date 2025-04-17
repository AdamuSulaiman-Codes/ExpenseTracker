import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSelector } from "react-redux";
import { getTopSpendingCategories } from "../assets/util"; // Make sure this path is correct

const COLORS = ["#f96d00", "#f2f2f2", "#393e46", "#222831", "#00adb5", "#ff5722"];

const TopSpendingChart = () => {
  const transactions = useSelector((state) => state.transaction.transaction || []);
  
  // Ensure transactions is an array
  const transactionsArray = Array.isArray(transactions) ? transactions : [];
  
  // Normalize transaction types to lowercase
  const normalizedTransactions = transactionsArray.map(transaction => ({
    ...transaction,
    type: transaction.type?.toLowerCase() || ""
  }));
  
  const data = getTopSpendingCategories(normalizedTransactions);
  
  // If no data or empty array, display a message
  if (!data || data.length === 0) {
    return <div>No expense data available to display</div>;
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center" }}>Top Spending Categories</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart layout="vertical" data={data} margin={{ left: 50 }}>
          <XAxis type="number" tickFormatter={(value) => `$${value}`} />
          <YAxis type="category" dataKey="category" />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="total" fill="#f96d00">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSpendingChart;