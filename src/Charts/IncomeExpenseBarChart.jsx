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

const IncomeExpenseBarChart = () => {
  const transactions = useSelector(
    (state) => state.transaction.transaction || []
  );

  console.log("Transactions from Redux:", transactions); // Debugging output

  const aggregatedData = transactions.reduce(
    (acc, transaction) => {
      const amount = parseFloat(transaction.amount) || 0;
      if (transaction.type === "Income") {
        acc[0].value += amount;
      } else {
        acc[1].value += Math.abs(amount);
      }
      return acc;
    },
    [
      { name: "Income", value: 0 },
      { name: "Expense", value: 0 },
    ]
  );

  console.log("Aggregated Data:", aggregatedData); // Debugging output

  return (
    <div className="chart-container" style={{ width: "70%", height: "250px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aggregatedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
