import React from "react";
import IncomeExpensePieChart from "../Charts/IncomeExpensePieChart";
import IncomeExpenseBarChart from "../Charts/IncomeExpenseBarChart";
import TopSpendingChart from "../Charts/TopSpendingChart";

const Report = () => {
  return (
    <div className="reports">
      <div className="reports-section reports-1">
        <div className="chart-card income-expense">
          <h1 className="chart-title">Income / Expense PieChart</h1>
          <IncomeExpensePieChart/>
        </div>
        <div className="chart-card income-expense">
          <h1 className="chart-title">Income / Expense BarChart</h1>
          <IncomeExpenseBarChart/>
        </div>
      </div>
      <div className="chart-card report-2">
        <h1 className="chart-title">Top Spending</h1>
        <TopSpendingChart/>
      </div>
    </div>
  );
};

export default Report;