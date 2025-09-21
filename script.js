const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let history = [];
let historyIndex = -1;
let memory = null;

// Update the calculator display
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// Update the history panel
function updateHistory() {
  historyDisplay.innerHTML = history.map((entry, i) =>
    `<div>${i + 1}: ${entry.expression} = ${entry.result}</div>`
  ).join('');
}

// Append value to current input
function appendValue(value) {
  if (display.textContent === 'Error') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

// Clear the input
function clearInput() {
  currentInput = '';
  updateDisplay();
}

// Evaluate the current expression (with ÷ sanitized)
function evaluateExpression() {
  try {
    const sanitized = currentInput.replace(/÷/g, '/');
    const result = eval(sanitized);
    history.push({ expression: currentInput, result });
    historyIndex = history.length - 1;
    currentInput = result.toString();
    updateDisplay();
    updateHistory();
  } catch (e) {
    currentInput = '';
    display.textContent = 'Error';
  }
}

// Memory functions
function memoryStore() {
  memory = currentInput;
}

function memoryRecall() {
  if (memory !== null) {
    currentInput += memory;
    updateDisplay();
  }
}

function memoryClear() {
  memory = null;
}

// Undo/Redo functions
function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    currentInput = history[historyIndex].expression;
    updateDisplay();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    currentInput = history[historyIndex].expression;
    updateDisplay();
  }
}

// Button click handling
buttons.forEach(button => {
  const value = button.textContent;

  if (button.classList.contains('clear')) {
    button.addEventListener('click', clearInput);
  } else if (button.classList.contains('equal')) {
    button.addEventListener('click', evaluateExpression);
  } else {
    button.addEventListener('click', () => appendValue(value));
  }
});

// Toggle history panel visibility
function toggleHistory() {
  historyDisplay.classList.toggle('hidden');
}