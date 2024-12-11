// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expensesList = document.getElementById('expenses-list');
const expenseChartCanvas = document.getElementById('expense-chart');

// Create Total Expense Display
defineTotalDisplay();
function defineTotalDisplay() {
  const totalExpenseDisplay = document.createElement('div');
  totalExpenseDisplay.id = 'total-expense';
  totalExpenseDisplay.innerText = 'Total Expense: ₹0';
  expenseForm.parentElement.appendChild(totalExpenseDisplay);
}
const totalExpenseDisplay = document.getElementById('total-expense');

// Restrict Date Input to Current Date or Earlier
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
expenseDateInput.max = today; // Set max attribute to today's date

// Expense Data
let expenses = [];

// Initialize Chart.js
let expenseChart = new Chart(expenseChartCanvas, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
});

// Update Total Expense
function updateTotalExpense() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpenseDisplay.innerText = `Total Expense: ₹${total.toFixed(2)}`;
}

// Render Expenses
function renderExpenses() {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.innerHTML = `
      <span>${expense.name} - ₹${expense.amount}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expensesList.appendChild(expenseItem);
  });
  updateChart();
  updateTotalExpense(); // Update the total expense
}

// Add Expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const date = expenseDateInput.value;

  // Validate the form inputs
  if (name && amount && date && date <= today) {
    expenses.push({ name, amount, date });
    renderExpenses();
    expenseForm.reset();
  } else {
    alert('Please enter valid details and ensure the date is not in the future.');
  }
});

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Update Chart
function updateChart() {
  const labels = expenses.map((expense) => expense.name);
  const data = expenses.map((expense) => expense.amount);

  expenseChart.data.labels = labels;
  expenseChart.data.datasets[0].data = data;
  expenseChart.update();
}

// Initialize
renderExpenses();