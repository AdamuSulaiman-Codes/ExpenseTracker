import { useSelector, useDispatch } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";
const TransactionDisplayController = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.transaction.category)

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
          {categories.map(category => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default TransactionDisplayController;
