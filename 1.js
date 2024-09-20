function anonymizeTransactions(transactions) {
  let anonymizedMap = new Map();
  transactions.forEach(transaction => {
    let anonymizedCustomerId = Math.random().toString(36).substring(2, 15);
    let anonymizedProductId = Math.random().toString(36).substring(2, 15);
    anonymizedMap.set(transaction.customerId, anonymizedCustomerId);
    anonymizedMap.set(transaction.productId, anonymizedProductId);
    transaction.customerId = anonymizedCustomerId;
    transaction.productId = anonymizedProductId;
  });
  return { transactions, anonymizedMap };
}

function calculateTotalExpenditure(transactions) {
  let expenditures = {};
  transactions.forEach(transaction => {
    if (!expenditures[transaction.customerId]) {
      expenditures[transaction.customerId] = 0;
    }
    expenditures[transaction.customerId] += transaction.quantity * transaction.pricePerUnit;
  });
  return expenditures;
}

function findMaxExpenditure(expenditures) {
  let maxExpenditure = Math.max(...Object.values(expenditures));
  let maxExpenditureCustomers = [];
  for (let [customerId, expenditure] of Object.entries(expenditures)) {
    if (expenditure === maxExpenditure) {
      maxExpenditureCustomers.push(customerId);
    }
  }
  return maxExpenditureCustomers;
}

function findMinExpenditure(expenditures) {
  let minExpenditure = Math.min(...Object.values(expenditures));
  let minExpenditureCustomers = [];
  for (let [customerId, expenditure] of Object.entries(expenditures)) {
    if (expenditure === minExpenditure) {
      minExpenditureCustomers.push(customerId);
    }
  }
  return minExpenditureCustomers;
}

function findHighestQuantityProduct(transactions) {
  let products = {};
  transactions.forEach(transaction => {
    if (!products[transaction.productId]) {
      products[transaction.productId] = 0;
    }
    products[transaction.productId] += transaction.quantity;
  });
  let maxQuantity = Math.max(...Object.values(products));
  let maxQuantityProducts = [];
  for (let [productId, quantity] of Object.entries(products)) {
    if (quantity === maxQuantity) {
      maxQuantityProducts.push(productId);
    }
  }
  return maxQuantityProducts;
}

const transactions = [
  {customerId:'C111', productId:'P1', quantity:3, pricePerUnit:100},
  {customerId:'C2222', productId:'P2', quantity:2, pricePerUnit:50},
  {customerId:'C3333', productId:'P3', quantity:1, pricePerUnit:200},
  {customerId:'C4444', productId:'P2', quantity:5, pricePerUnit:50},
  {customerId: 'C111', productId:'P2', quantity:2, pricePerUnit:50}
];

let { transactions: anonymizedTransactions } = anonymizeTransactions(transactions);
let expenditures = calculateTotalExpenditure(anonymizedTransactions);
let maxExpenditureCustomers = findMaxExpenditure(expenditures);
let minExpenditureCustomers = findMinExpenditure(expenditures);
let maxQuantityProducts = findHighestQuantityProduct(anonymizedTransactions);

console.log("Total expenditure of each anonymized customer:", expenditures);
console.log("Anonymized customer(s) with the highest total expenditure:", maxExpenditureCustomers);
console.log("Anonymized customer(s) with the lowest total expenditure:", minExpenditureCustomers);
console.log("Product(s) with highest quantity sold:", maxQuantityProducts);
