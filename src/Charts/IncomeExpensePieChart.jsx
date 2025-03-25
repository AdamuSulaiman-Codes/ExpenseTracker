import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#4CAF50", "#f96d00"]; // Green for Income, Orange for Expense

const IncomeExpensePieChart = () => {
  const transactions = useSelector((state) => state.transaction.transaction);

  // Aggregate data into total income & total expenses
  const aggregatedData = transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount; // Convert "5,000" to 5000
      if (transaction.type === "Income") {
        acc[0].value += amount; // Income
      } else {
        acc[1].value += amount; // Expense
      }
      return acc;
    },
    [
      { name: "Income", value: 0 },
      { name: "Expense", value: 0 },
    ]
  );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={aggregatedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name }) => name}>
            {aggregatedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePieChart;
