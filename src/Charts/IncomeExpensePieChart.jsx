import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#4CAF50", "#F44336"]; // Green for income, Red for expense

const IncomeExpensePieChart = () => {
  const transactions = useSelector((state) => state.transaction.transaction || []);
  
  // Ensure transactions is an array
  const transactionsArray = Array.isArray(transactions) ? transactions : [];

  // Calculate total income and expenses
  const { income, expense } = transactionsArray.reduce(
    (acc, transaction) => {
      const amount = parseFloat(transaction.amount) || 0;
      // Convert type to lowercase for consistency
      const type = transaction.type?.toLowerCase() || "";
      
      if (type === "income") {
        acc.income += amount;
      } else if (type === "expense") {
        acc.expense += Math.abs(amount); // Using abs to ensure positive value
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  // Don't render chart if no data
  if (income === 0 && expense === 0) {
    return <div>No transaction data available</div>;
  }

  const formatTooltip = (value) => `$${value.toFixed(2)}`;

  return (
    <div style={{ width: "100%", height: "250px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePieChart;