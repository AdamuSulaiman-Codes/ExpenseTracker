import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { transactionAction } from '../store/TransactionSlice'
import { Formatter } from '../assets/util'
const AddCategory = () => {
  const categories = useSelector((state) => state.transaction.category)
  const transactions = useSelector(state => state.transaction.transaction)

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  function handleAddCategory(e){
    e.preventDefault()
    const input = inputRef.current.value.trim()
    if (input === "") return
    dispatch(transactionAction.addCategory(input))
    inputRef.current.value = ""
  }


  function handleDeleteCategory(index){
    dispatch(transactionAction.removeCategory(index))
  }



  // First, get unique categories
const allCategories = [...new Set(transactions.map(transaction => transaction.category))];

// Create an object to store totals by category
const categoryTotals = {};

// Calculate totals for each category
allCategories.forEach(category => {
  // Filter transactions by category
  const categoryTransactions = transactions.filter(
    transaction => transaction.category === category
  );
  
  // Calculate total for this category
  const categoryTotal = categoryTransactions.reduce(
    (acc, transaction) => acc + parseFloat(transaction.amount), 
    0
  );
  
  // Store the result
  categoryTotals[category] = categoryTotal;
});
  return (
    <div className="add-category-container">
      <h2 className="add-category-heading">Manage Categories</h2>
      <form className="add-category-form">
        <input
          type="text"
          placeholder="Enter new category"
          className="category-input"
          ref={inputRef}
          required
        />
        <button type="click" className="add-category-btn" onClick={(e)=> handleAddCategory(e)}>
          Add Category
        </button>
      </form>

      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <span className="category-name">{category}</span>
            <button className="delete-btn" onClick={() => handleDeleteCategory(index)}>❌</button>
          </li>
        ))}
      </ul>
      <h2>Total Spent By: </h2>
      <ul className="category-totals-list">
        {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category} className="category-total-item">
            <span className="category-name">{category}</span>
            <span className="category-amount">{Formatter.format(total)}</span>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default AddCategory
