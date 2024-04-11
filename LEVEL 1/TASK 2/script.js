let displayValue = "";
let decimalAdded = false;

function appendNumber(num) {
  displayValue += num;
  document.querySelector(".calc-inp").value = displayValue;
}

function appendOperator(operator) {
  if (displayValue !== "") {
    if (operator === "%") {
      const currentValue = parseFloat(displayValue);
      const result = currentValue / 100;
      displayValue = result.toString();
      document.querySelector(".calc-inp").value = displayValue;
      decimalAdded = false;
    } else {
      displayValue += operator;
      document.querySelector(".calc-inp").value = displayValue;
      decimalAdded = false;
    }
  } else if (operator === "-" || operator === "+") {
    displayValue += operator;
    document.querySelector(".calc-inp").value = displayValue;
  }
}

function appendDecimal() {
  if (!decimalAdded) {
    displayValue += ".";
    document.querySelector(".calc-inp").value = displayValue;
    decimalAdded = true;
  }
}

function clearDisplay() {
  displayValue = "";
  document.querySelector(".calc-inp").value = "";
  decimalAdded = false;
}

function calculateResult() {
  try {
    let result = evaluateExpression(displayValue);
    document.querySelector(".calc-inp").value = result;
    displayValue = result.toString();
  } catch (error) {
    document.querySelector(".calc-inp").value = "Error";
    displayValue = "";
  }
}

function evaluateExpression(expression) {
  expression = expression.replace(/×/g, "*");

  if (!/^[\d\s\.\+\-\*\/\%]+$/.test(expression)) {
    throw new Error("Invalid expression");
  }

  let result = eval(expression);
  return result;
}

document.querySelector(".btns").addEventListener("click", function (event) {
  const button = event.target;
  const buttonValue = button.textContent.trim();

  if (buttonValue !== "") {
    if (!isNaN(parseFloat(buttonValue)) || buttonValue === "0") {
      appendNumber(buttonValue);
    } else if (buttonValue === ".") {
      appendDecimal();
    }
  } else {
    const iconElement = button.querySelector("i");
    if (iconElement) {
      const iconClass = iconElement.classList[1];
      switch (iconClass) {
        case "fa-percent":
          appendOperator("%");
          break;
        case "fa-plus":
          appendOperator("+");
          break;
        case "fa-minus":
          appendOperator("-");
          break;
        case "fa-divide":
          appendOperator("/");
          break;
        case "fa-xmark":
          appendOperator("*");
          break;
        default:
          break;
      }
    }
  }
});

document.querySelector(".rst-btn").addEventListener("click", clearDisplay);

document
  .querySelector(".result-btn")
  .addEventListener("click", calculateResult);
