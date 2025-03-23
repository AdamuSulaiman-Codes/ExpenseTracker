import { db, collection, addDoc } from "../firebase/firebaseConfig";
import { transactionData } from "./routeData";

const transactionsCollection = collection(db, "transactions");

/**
 * Uploads the initial transaction data to Firestore.
 */
const uploadTransactions = async () => {
  try {
    for (const transaction of transactionData) {
      await addDoc(transactionsCollection, transaction);
    }
    console.log("Initial transactions added successfully!");
  } catch (error) {
    console.error("Error uploading transactions:", error);
  }
};

/**
 * Adds a new transaction to Firestore.
 * @param {Object} transaction - The transaction object to add.
 */
const addTransaction = async (transactionData) => {
  const transactionsRef = collection(db, "transactions");
  const existingTransactions = await getDocs(transactionsRef);

  const existingTitles = new Set(
    existingTransactions.docs.map((doc) => doc.data().title)
  );

  transactionData.forEach(async (transaction) => {
    if (!existingTitles.has(transaction.title)) {
      await addDoc(transactionsRef, transaction);
    }
  });
};

export { uploadTransactions, addTransaction };

export const Formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
