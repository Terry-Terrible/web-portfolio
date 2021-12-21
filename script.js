const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const mychart = document.getElementById("mychart");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "Insert text here...";
    text.style.backgroundColor = "#cccccc";
    amount.placeholder = "Please enter the amount...";
    amount.style.backgroundColor = "#cccccc";
  } else {
    const transaction = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//generate id
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transactions to dom list
function addTransactionDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;
  list.appendChild(item);
}

//update the balance
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `Rs ${total}`;
  money_plus.innerText = `Rs ${income}`;
  money_minus.innerText = `Rs ${expense}`;
}

//remove
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransaction);

function mychart()
var xValues = ["Food", "Utilities", "Rent", "Transport", "Misc."];
var yValues = [3000, 1500, 3000,1000, 2000];
var barColors = ["#b91d47","#00aba9","#2b5797","#e8c3b9","#1e7145"];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Expenses'
        },
   }
});