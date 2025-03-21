import React from "react";
import CardList from "./CardList";
import Chart from "./Chart";
import RecentTransaction from "./RecentTransaction";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { transactionAction } from "../store/TransactionSlice";
import { useDispatch } from "react-redux";

const DashBoard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="dashboard">
        <CardList />
        <Chart />
        <RecentTransaction />
      </section>
      <TbSquareRoundedPlusFilled
        size={80}
        className="custom-icon"
        onClick={() => {
          console.log("cliked");

          dispatch(transactionAction.openModal("addTransactions"));
        }}
      />
    </>
  );
};

export default DashBoard;
