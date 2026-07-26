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
let incomeTotalBox = document.querySelector("#total-income");
let expenseTotalBox = document.querySelector("#total-spent");
let balanceTotalBox = document.querySelector("#money-left");

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
        "moneyTracker_" + savedUsername,
        JSON.stringify(data)
    );
}

// load the users saved information
function loadData() {
    let savedData = localStorage.getItem(
        "moneyTracker_" + savedUsername
    );
    if (savedData) {
        let data = JSON.parse(savedData);  //JSON parse converts the string back into an object
        totalMoney = Number(data.income) || 0;
        totalSpent = Number(data.expenses) || 0;
        history = Array.isArray(data.history) ? data.history : [];
    }
}

// update the three total boxes
function updateTotals() {
    incomeTotalBox.textContent = 
    "$" + totalMoney.toFixed(2); // used toFixed(2) to round the number to 2 decimal places

    expenseTotalBox.textContent =
    "$" + totalSpent.toFixed(2);

    balanceTotalBox.textContent =
    "$" + (totalMoney - totalSpent).toFixed(2);
}

// show history on history page
function updateHistory() {
    historyList.innerHTML = "";
    if (history.length === 0) {
        let noHistoryItem = document.createElement("li");
        noHistoryItem.textContent = "No history yet.";
        historyList.appendChild(noHistoryItem);
        return;
    }

// start at end of newest item appears first
for (let i = history.length - 1; i >= 0; i--) {
    let historyItem = history[i];

    let listItem = document.createElement("li");

    listItem.textContent =
    historyItem.type +
    ": " +
    historyItem.name +
    " - $" +
    Number(historyItem.amount).toFixed(2);

    historyList.appendChild(listItem);
}
}

if (loginForm) {
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let username = usernameBox.value.trim();
    if (username) {
        savedUsername = username;
        localStorage.setItem("username", savedUsername);
        loginScreen.style.display = "none";
        app.style.display = "block";
        welcomeMessage.textContent = "Welcome, " + savedUsername + "!";
        loadData();
        updateTotals();
        updateHistory();
    } else {
        message.textContent = "Please enter a valid username.";
    }
});
}

// fixing add income form so it wont log us out
if (incomeForm) {
incomeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let amount = Number(incomeAmount.value);
    if (amount > 0) {
    totalMoney = totalMoney + amount;
    history.push({ type: "Income", name: incomeName.value, amount: amount });
    updateTotals();
    saveData();
    updateHistory();
    incomeAmount.value = "";
    }
});
}

// Show saved data when history.html is open.
let historyUsername = document.querySelector("#history-username");
if (historyUsername && savedUsername) {
    historyUsername.textContent = "History for " + savedUsername;
    loadData();
    updateHistory();
}

//fix spending form so it wont log us out
if (expenseForm) {
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let amount = Number(expenseAmount.value);
    if (amount > 0) {
        totalSpent = totalSpent + amount;
        history.push({ type: "Expense", name: expenseName.value, amount: amount });
        updateTotals();
        saveData();
        updateHistory();
        expenseAmount.value = "";
    }
});
}

//logout button
if (logoutButton) {
logoutButton.addEventListener("click", function () {
    localStorage.removeItem("username");
    savedUsername = null;
    loginScreen.style.display = "block";
    app.style.display = "none";
});
}

// Keep the dashboard open when a saved user refreshes the page.
if (savedUsername && loginScreen && app) {
    loginScreen.style.display = "none";
    app.style.display = "block";
    welcomeMessage.textContent = "Welcome, " + savedUsername + "!";
    loadData();
    updateTotals();
    updateHistory();
}
