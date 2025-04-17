
export const Formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// utils/getTopSpendingCategories.js
export const getTopSpendingCategories = (transactions) => {
  const categoryTotals = {};

  // Make sure transactions is an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  safeTransactions.forEach((transaction) => {
    // Check that type is "expense" (case insensitive)
    if (transaction.type && transaction.type.toLowerCase() === "expense") {
      const { category, amount } = transaction;
      
      // Skip if category is missing
      if (!category) return;
      
      // Convert amount to number safely
      const numAmount = parseFloat(amount);
      
      // Only add valid numbers
      if (!isNaN(numAmount)) {
        categoryTotals[category] = (categoryTotals[category] || 0) + numAmount;
      }
    }
  });

  // Convert to array and sort descending
  return Object.entries(categoryTotals)
    .map(([category, total]) => ({ 
      category, 
      total: parseFloat(total.toFixed(2)) // Round to 2 decimal places
    }))
    .sort((a, b) => b.total - a.total);
};