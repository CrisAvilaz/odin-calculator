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

function isValid(){

    const {firstNumber, operator, secondNumber} = calculator;

    if (firstNumber === null || firstNumber === "") return false;
    
    if (secondNumber === null || secondNumber === "") return false;

    if (!validOperators.includes(operator)) return false;

    const a = Number(firstNumber);
    const b = Number(secondNumber);

    if (Number.isNaN(a) || Number.isNaN(b)) return false;

    if (operator === "/" && b === 0) return false;

    return true;
}


// Opera os inputs validados

function operate(){

    const {firstNumber, operator, secondNumber} = calculator;

    const operations = {
        "+": add,
        "-": substract,
        "*": multiply,
        "/": divide
    }

    if(!isValid()) return "Error";

    return operations[operator](
        Number(firstNumber),
        Number(secondNumber)
    );
}

// Listeners de inputs

function handleNumberClick(digit){
    
    if (calculator.shouldResetDisplay){
        updateDisplay(digit);
        calculator.shouldResetDisplay = false;
    } else {
        updateDisplay(display.textContent + digit);
    }

    if (calculator.operator === null){
        calculator.firstNumber = display.textContent;
    } else {
        calculator.secondNumber = display.textContent;
    }
}

function handleOperatorClick(op){

    if (calculator.operator !== null && calculator.secondNumber !== null){
        const result = operate();
        
        calculator.firstNumber = result;
        calculator.secondNumber = null;
        updateDisplay(result);
    }

        calculator.operator = op;
        calculator.shouldResetDisplay = true;
}

function handleEquals(){

    if (!isValid()) return;

        const result = operate();
        updateDisplay(result);

        calculator.firstNumber = result;
        calculator.secondNumber = null;
        calculator.operator = null;
        calculator.shouldResetDisplay = true;
}

function handleClear(){

        calculator.firstNumber = null;
        calculator.secondNumber = null;
        calculator.operator = null;
        calculator.shouldResetDisplay = true;
        updateDisplay("0");
}
