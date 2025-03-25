import { useSelector, useDispatch } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";
const TransactionDisplayController = () => {
  const dispatch = useDispatch();

  function handleSearchChange(event) {
    dispatch(transactionAction.setSearchQuery(event.target.value));
  }
  function handleDateChange(event) {
    dispatch(transactionAction.setDateFilter(event.target.value));
  }
  function handleCategoryChange(event) {
    dispatch(transactionAction.setCategoryFilter(event.target.value));
  }
  function handleTypeChange(event) {
    dispatch(transactionAction.setTypeFilter(event.target.value));
  }

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
        <option value="All">All</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <select
        name="category"
        defaultValue="All"
        onChange={handleCategoryChange}>
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Transport">Transport</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>
    </section>
  );
};

export default TransactionDisplayController;
