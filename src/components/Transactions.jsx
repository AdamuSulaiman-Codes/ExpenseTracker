import React from "react";
import TransactionList from "./TransactionList";
import TransactionDisplayController from "./TransactionDisplayController";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { transactionAction } from "../store/TransactionSlice";
import { useDispatch } from "react-redux";
const Transactions = () => {
  const dispatch = useDispatch();
  return (
    <div className="transactions">
      <TransactionDisplayController />
      <TransactionList />
      <TbSquareRoundedPlusFilled
        size={80}
        className="custom-icon"
        onClick={() => {
          console.log("cliked");

          dispatch(transactionAction.openModal("addTransactions"));
        }}
      />
    </div>
  );
};

export default Transactions;
