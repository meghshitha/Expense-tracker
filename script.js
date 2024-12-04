
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expensesList = document.getElementById('expenses-list');
const expenseChartCanvas = document.getElementById('expense-chart');


const today = new Date().toISOString().split('T')[0]; 
expenseDateInput.max = today; 


let expenses = [];


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
}


expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const date = expenseDateInput.value;

  
  if (name && amount && date && date <= today) {
    expenses.push({ name, amount, date });
    renderExpenses();
    expenseForm.reset();
  } else {
    alert('Please enter valid details and ensure the date is not in the future.');
  }
});


function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}


function updateChart() {
  const labels = expenses.map((expense) => expense.name);
  const data = expenses.map((expense) => expense.amount);

  expenseChart.data.labels = labels;
  expenseChart.data.datasets[0].data = data;
  expenseChart.update();
}


renderExpenses();
