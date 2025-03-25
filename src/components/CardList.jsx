import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { Formatter } from "../assets/util";

const CardList = () => {
  const transactions = useSelector((state) => state.transaction.transaction);

  const filteredExpense = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const totalExpense = filteredExpense.reduce(
    (acc, transaction) => acc + parseFloat(transaction.amount),
    0
  );

  const filteredIncome = transactions.filter(
    (transaction) => transaction.type === "Income"
  );

  const totalIncome = filteredIncome.reduce(
    (acc, transaction) => acc + parseFloat(transaction.amount),
    0
  );

  const total = totalIncome - totalExpense;

  return (
    <section className="card-list">
      <Card
        title="Total-Expense"
        amount={Formatter.format(totalExpense)}
        style={{ color: "red" }}
      />
      <Card
        title="Total Income"
        amount={Formatter.format(totalIncome)}
        style={{ color: "green" }}
      />
      <Card
        title="Balance"
        amount={Formatter.format(total)}
        style={{ color: "#8dc6ff" }}
      />
    </section>
  );
};

export default CardList;
