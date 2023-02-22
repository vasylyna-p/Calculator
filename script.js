const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');


// Appending and Displaying number at current operand

const appendNumber = number => {
    if (number === '.' && currentOperand.innerHTML.toString().includes('.')) {
        return;
    }
    currentOperand.innerHTML = currentOperand.innerHTML.toString() + number.toString();
}

// Displaying choosen operation at previous operand

const chooseOperation = operation => {
    if (currentOperand.innerHTML === '') {
        return;
    }
    if (previousOperand !== '') {
        compute();
    }
    previousOperand.innerHTML = currentOperand.innerHTML + operation;
    currentOperand.innerHTML = '';
}

//  Computation function

const compute = () => {
    let computation;
    let prev = previousOperand.innerHTML;
    operation = prev.toString().slice(-1);
    prev = parseFloat(prev);
    let current = parseFloat(currentOperand.innerHTML);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand.innerHTML = computation;
    previousOperand.innerHTML = '';
};


numberButtons.forEach(button => {
    let number = button.innerText;
    button.addEventListener('click', () => appendNumber(number));
})

operationButtons.forEach(button => {
    let operation = button.innerHTML;
    button.addEventListener('click', () => chooseOperation(operation))
})


allClearButton.addEventListener('click', () => {
    currentOperand.innerHTML = '';
    previousOperand.innerHTML = '';
});

deleteButton.addEventListener('click', () => {
    currentOperand.innerHTML = currentOperand.innerHTML.toString().slice(0, -1);
})

equalButton.addEventListener('click', () => {
    compute();
})