import { useSelector } from "react-redux";
import { Formatter } from "../assets/util";
const RecentTransaction = () => {
  const transactions = useSelector((state) => state.transaction.transaction);
  const recentTransaction = transactions.at(-1);

  let style = undefined;
  if (recentTransaction.type === "Income") {
    style = { color: "green" };
  } else {
    style = { color: "red" };
  }
  return (
    <main className="recent">
      <p id="recent-header">Recent Transactions</p>
      <div className="recent-description">
        <p>{recentTransaction.title}</p>
        <p>{recentTransaction.date}</p>
        <p style={style}>{Formatter.format(recentTransaction.amount)}</p>
      </div>
    </main>
  );
};

export default RecentTransaction;
