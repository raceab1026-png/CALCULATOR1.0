const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      // Clear display and expression
      expression = '';
      display.textContent = '0';
    } else if (button.classList.contains('equal')) {
      try {
        // Evaluate with proper operator precedence
        const result = eval(expression);
        expression = result.toString();
        display.textContent = expression;
      } catch (error) {
        expression = '';
        display.textContent = 'Error';
      }
    } else {
      // Append number or operator
      if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
        expression = value;
      } else {
        display.textContent += value;
        expression += value;
      }
    }
  });
});
