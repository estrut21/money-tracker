// totaling money
let totalMoney = 0;
let totalSpent = 0;

//Get saved username
let savedUsername = localStorage.getItem("username");

//so it connects to history page
let history = [];

//login 
let loginScreen = document.querySelector("#login-screen");
let app = document.querySelector("#app");
let loginForm = document.querySelector("#login-form");
let usernameBox = document.querySelector("#username");
let welcomeMessage = document.querySelector("#welcome-message");
let logoutButton = document.querySelector("#logout-button");
let message = document.querySelector("#message");

//Income
let incomeForm = document.querySelector("#income-form");
let incomeAmount = document.querySelector("#income-amount");
let incomeName = document.querySelector("#income-name");

//Spending section
let expenseForm = document.querySelector("#expense-form");
let expenseAmount = document.querySelector("#expense-amount");
let expenseName = document.querySelector("#expense-name");

//Total boxes
let incomeTotalBox = document.querySelector("#income-total");
let expenseTotalBox = document.querySelector("#expense-total");
let balanceTotalBox = document.querySelector("#balance-total");

//History section
let historyList = document.querySelector("#history-list");

// save data
function saveData() {
    let data = {
        income: totalMoney,
        expenses: totalSpent,
        history: history
    };
   
    localStorage.setItem(
        "moneyTracker_" + currentUser,
        JSON.stringify(data)
    );
}

// load the users saved information
function loadData() {
    let savedData = localStorage.getItem(
        "moneyTracker_" + currentUser
    );
    if (savedData) {
        let data = JSON.parse(savedData);  //JSON parse converts the string back into an object
        totalMoney = data.income;
        totalSpent = data.expenses;
        history = data.history;
    }
}
