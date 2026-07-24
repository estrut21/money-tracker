let income = 0;
let spent = 0;
let user = localStorage.getItem("currentUser");
let history = [];

const loginScreen = document.querySelector("#login-screen");
const app = document.querySelector("#app");
const loginForm = document.querySelector("#login-form");
const nameInput = document.querySelector("#username");
const welcome = document.querySelector("#welcome-message");
const logoutBtn = document.querySelector("#logout-button");
const message = document.querySelector("#message");

const incomeForm = document.querySelector("#income-form");
const expenseForm = document.querySelector("#expense-form");

const incomeBox = document.querySelector("#income-amount");
const incomeName = document.querySelector("#income-name");
const expenseBox = document.querySelector("#expense-amount");
const expenseName = document.querySelector("#expense-name");

const incomeTotal = document.querySelector("#total-income");
const spentTotal = document.querySelector("#total-spent");
const leftTotal = document.querySelector("#money-left");
const historyList = document.querySelector("#history-list");

function storageKey() {
    return "moneyTracker_" + user;
}

function save() {
    localStorage.setItem(storageKey(), JSON.stringify({
        income: income,
        spent: spent,
        history: history
    }));
}

function load() {
    const saved = localStorage.getItem(storageKey());

    income = 0;
    spent = 0;
    history = [];

    if (saved) {
        const data = JSON.parse(saved);
        income = data.income || data.totalIncome || 0;
        spent = data.spent || data.totalSpent || 0;
        history = data.history || [];
    }
}

function showTotals() {
    incomeTotal.textContent = "$" + income.toFixed(2);
    spentTotal.textContent = "$" + spent.toFixed(2);
    leftTotal.textContent = "$" + (income - spent).toFixed(2);
}

function showHistory() {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history yet</li>";
        return;
    }

    for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        const li = document.createElement("li");
        const amount = Number(item.amount);

        li.textContent = item.type + ": " + item.name + " - $" + amount.toFixed(2);
        historyList.appendChild(li);
    }
}

function openTracker() {
    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");
    welcome.textContent = "Lets track money, " + user;
    message.textContent = "";
    load();
    showTotals();
    showHistory();
}

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    user = nameInput.value.trim();

    if (!user) {
        alert("Type a username first.");
        return;
    }

    localStorage.setItem("currentUser", user);
    nameInput.value = "";
    openTracker();
});

logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    user = "";

    app.classList.add("hidden");
    loginScreen.classList.remove("hidden");
});

incomeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let amount = Number(incomeBox.value);
    if (!amount || amount < 0) {
        alert("Please enter an income amount.");
        return;
    }

    income += amount;
    history.push({
        type: "Income",
        name: incomeName.value || "Money",
        amount: amount
    });

    save();
    showTotals();
    showHistory();

    message.textContent = "Income added";
    incomeBox.value = "";
    incomeName.value = "";
});

expenseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let amount = Number(expenseBox.value);
    if (!amount || amount < 0) {
        alert("Please enter a spending amount.");
        return;
    }

    spent += amount;
    history.push({
        type: "Spent",
        name: expenseName.value || "Something",
        amount: amount
    });

    expenseBox.value = "";
    expenseName.value = "";

    save();
    showTotals();
    showHistory();
    message.textContent = "Spending added";
});

if (user) {
    openTracker();
} else {
    loginScreen.classList.remove("hidden");
    app.classList.add("hidden");
}

n
user = localStorage.getItem("currentUser");
