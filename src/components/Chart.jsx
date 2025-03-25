import React from "react";
import IncomeExpensePieChart from "../Charts/IncomeExpensePieChart";
import IncomeExpenseBarChart from "../Charts/IncomeExpenseBarChart";

const Chart = () => {
  return (
    <div className="chart">
      <h1>Expense/Income -- Bar Chart</h1>
      <IncomeExpenseBarChart />
    </div>
  );
};

export default Chart;
