let currentInput = '0';
let previousInput = '';
let operator = null;
let resetScreen = false;

const display = document.getElementById('display');
const opView = document.getElementById('op-view');

function updateDisplay() {
    display.innerText = currentInput;
    if (operator && previousInput !== '') {
        opView.innerText = previousInput + " " + operator;
    } else {
        opView.innerText = "";
    }
}

function appendNumber(num) {
    if (currentInput === '0' || resetScreen) {
        currentInput = num;
        resetScreen = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return; // Double dot prevent karein
        currentInput += num;
    }
    updateDisplay();
}

function deleteLast() {
    if (resetScreen) return; 
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
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
     if (op === 'x²') {
        currentInput = (Math.pow(parseFloat(currentInput), 2)).toString();
        updateDisplay();
        return;
    }
    if (op === '√') {
        currentInput = (Math.sqrt(parseFloat(currentInput))).toString();
        updateDisplay();
        return;
    }

    if (operator !== null) calculate();
    operator = op;
    previousInput = currentInput;
    resetScreen = true;
    updateDisplay();
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

//Keyboard support

document.addEventListener('keydown', (event) => {
    const key = event.key;

    
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    }

    
    if (key === '+') setOperator('+');
    if (key === '-') setOperator('-');
    if (key === '*') setOperator('x');
    if (key === '/') {
        event.preventDefault(); 
        setOperator('÷');
    }

    
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    if (key === 'Backspace') {
        deleteLast();
    }

    if (key === 'Escape') {
        clearDisplay();
    }
});