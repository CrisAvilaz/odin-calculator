// Estado da calculadora

calculator = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    shouldResetDisplay: false
}

// Funções básicas

function add(a, b){
        return a + b;
}

function substract(a, b){
        return a - b;
}

function multiply(a, b){
        return a * b;
}

function divide(a, b){
        return a / b;
}

// Valida os inputs do usuário

const validOperators = Object.freeze(["+", "-", "/", "*"]);

function isValid(firstNumber, operator, secondNumber){

    if (firstNumber === null ||
        firstNumber === undefined ||
        firstNumber === "") return false;
    
    if (secondNumber === null ||
        secondNumber === undefined ||
        secondNumber === "") return false;

    if (!validOperators.includes(operator)) return false;

    const a = Number(firstNumber);
    const b = Number(secondNumber);

    if (Number.isNaN(a) || Number.isNaN(b)) return false;

    if (operator === "/" && b === 0) return false;

    return true;
}


// Opera os inputs validados

function operate(firstNumber, secondNumber, operator){

    const operations = {
        "+": add,
        "-": substract,
        "*": multiply,
        "/": divide
    }

    if(!isValid(firstNumber, operator, secondNumber)) return "Error";

    return operations[operator](
        Number(firstNumber),
        Number(secondNumber)
    );
}

// Listeners de inputs

function handleNumberClick(digit){
    
    if (shouldResetDisplay){
        updateDisplay(digit);
        shouldResetDisplay = false;
    } else {
        updateDisplay(display.textContent + digit);
    }

    if (operator === null){
       firstNumber = display.textContent;
    }
    else {
        secondNumber = display.textContent;
    }
    
}

function handleOperatorClick(op){

    if (operator !== null && secondNumber !== null){
        const result = operate(firstNumber, secondNumber, operator)
        updateDisplay(result);
        firstNumber = result;
        secondNumber = null;
    }

        operator = op;
        shouldResetDisplay = true;
}

function handleEquals(){
    if (!isValid(firstNumber, secondNumber, operator)) return;

        const result = operate(firstNumber, secondNumber, operator);
        updateDisplay(result);

        firstNumber = result;
        secondNumber = null;
        operator = null;
        shouldResetDisplay = true;
}

function handleClear(){
        firstNumber = null;
        secondNumber = null;
        operator = null;
        shouldResetDisplay = true;
        updateDisplay("0");
}
