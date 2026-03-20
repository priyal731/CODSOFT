let currentInput = '0';
let previousInput = '';
let operator = null;
let resetScreen = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' || resetScreen) {
        currentInput = num;
        resetScreen = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null) calculate();
    operator = op;
    previousInput = currentInput;
    resetScreen = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case 'x': result = prev * curr; break;
        case '÷': 
            result = curr === 0 ? "Error" : prev / curr; 
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resetScreen = true;
    updateDisplay();
}