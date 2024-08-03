const result = $('#result');
const clear = $('#clear');
const division = $('#division');
const multiplication = $('#multiplication');
const addition = $('#addition');
const substraction = $('#substraction');
const equal = $('#equal');
const comma = $('#comma');
const negative = $('#negative');
const num1 = $('#num1');
const num2 = $('#num2');
const num3 = $('#num3');
const num4 = $('#num4');
const num5 = $('#num5');
const num6 = $('#num6');
const num7 = $('#num7');
const num8 = $('#num8');
const num9 = $('#num9');
const num0 = $('#num0');

let currentInput = '';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

function updateDisplay(value) {
    result.html(`<span class="blink">${value}</span>`);
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultDisplayed = false;
    updateDisplay('0');
}

function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        previousInput = '';
        operator = '';
        resultDisplayed = false;
    }
    if (number === ',' && currentInput.includes(',')) return;
    currentInput = currentInput.toString() + number.toString();
    updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
}

function chooseOperator(op) {
    if (resultDisplayed) {
        previousInput = currentInput;
        currentInput = '';
        resultDisplayed = false;
    } else {
        if (currentInput === '' && operator === '') return; // Prevent setting operator if no number entered
        if (previousInput !== '' && operator !== '') {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '';
    }
    operator = op;
    updateDisplay(previousInput + ' ' + operator);
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput.replace(',', '.'));
    const current = parseFloat(currentInput.replace(',', '.'));
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation.toString().replace('.', ',');
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
    resultDisplayed = true;
}

clear.on('click', clearAll);

[num0, num1, num2, num3, num4, num5, num6, num7, num8, num9].forEach((button, index) => {
    button.on('click', () => {
        appendNumber(index.toString());
    });
});

comma.on('click', () => {
    appendNumber(',');
});

addition.on('click', () => {
    chooseOperator('+');
});

substraction.on('click', () => {
    chooseOperator('-');
});

multiplication.on('click', () => {
    chooseOperator('*');
});

division.on('click', () => {
    chooseOperator('/');
});

equal.on('click', () => {
    calculate();
});

negative.on('click', () => {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput.replace(',', '.')) * -1).toString().replace('.', ',');
    updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
});

function blink(selector) {
    $(selector).fadeOut('slow', function () {
        $(this).fadeIn('slow', function () {
            blink(this);
        });
    });
}

blink('.blink');
