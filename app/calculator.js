exports.calculate = function (expression) {
  if (!expression) return 0;  
  return calculator(expression.split(' '));
};


function calculator(expression) {
  const stack = [];

  // Iterate through each character in the expression
  for (let i = expression.length - 1; i >= 0; i--) {
    const char = expression[i];

    // If the character is a digit, push it onto the stack
    if (!isNaN(parseInt(char))) {
      stack.push(parseInt(char));
    } else if (isOperator(char)) {
      // If the character is an operator, pop two values from the stack
      const operand1 = stack.pop();
      const operand2 = stack.pop();

      // Perform the operation and push the result back onto the stack
      const result = performOperation(char, operand1, operand2);
      stack.push(result);
    } else {
      throw new Error('Invalid character: ' + char);
    }
  }

  // The final result will be left on the stack
  return stack.pop();
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function performOperation(operator, operand1, operand2) {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    // Add more operators here if needed
    default:
      throw new Error('Invalid operator: ' + operator);
  }
}
