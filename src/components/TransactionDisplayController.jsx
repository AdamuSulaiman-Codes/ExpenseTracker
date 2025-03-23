import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";

const TransactionDisplayController = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.transaction.searchQuery);

  function handleSearchChange(event) {
    dispatch(transactionAction.setSearchQuery(event.target.value));
  }
  function handleDateChange(event) {}
  function handleCategoryChange(event) {}
  function handleTypeChange(event) {}

  return (
    <section className="transaction-controller">
      <input
        type="text"
        name="search"
        placeholder="Search Transactions..."
        onChange={handleSearchChange}
      />
      <input type="date" name="date" onChange={handleDateChange} />
      <select name="type" defaultValue="All" onChange={handleTypeChange}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
        <option value="All">All</option>
      </select>
      <select
        name="category"
        defaultValue="All"
        onChange={handleCategoryChange}>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Transport">Transport</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
        <option value="All">All</option>
      </select>
    </section>
  );
};

export default TransactionDisplayController;
