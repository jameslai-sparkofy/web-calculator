let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = '';
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            if (operator && previousInput !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '';
        }
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function updateDisplay() {
    if (currentInput !== '') {
        display.value = currentInput;
    } else if (operator !== '') {
        display.value = previousInput + ' ' + getOperatorSymbol(operator);
    }
}

function getOperatorSymbol(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '/';
        default: return '';
    }
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        try {
            let result;
            const prev = parseFloat(previousInput);
            const curr = parseFloat(currentInput);
            
            switch(operator) {
                case '+':
                    result = prev + curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '*':
                    result = prev * curr;
                    break;
                case '/':
                    if (curr === 0) {
                        throw new Error('Division by zero');
                    }
                    result = prev / curr;
                    break;
                default:
                    throw new Error('Invalid operator');
            }
            
            result = Math.round(result * 100000000) / 100000000;
            
            display.value = result.toString();
            currentInput = result.toString();
            operator = '';
            previousInput = '';
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
            operator = '';
            previousInput = '';
        }
    }
}

function clearDisplay() {
    display.value = '0';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function clearEntry() {
    currentInput = '';
    display.value = previousInput || '0';
}

function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

clearDisplay();

if (window.self !== window.top) {
    document.body.classList.add('iframe-mode');
}