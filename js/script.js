// Operadores válidos

const VALID_OPERATORS = Object.freeze(["+", "-", "/", "*"]);

// funções básicas, soma, subtração, divisão e multiplicação.

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

// função validadora
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


//soma os numeros "=" operate()

function operate(firstNumber, operator, secondNumber){
    
}


// Calculadora recebe um numero firstNumber

// recebe um operador curentOperator

// recebe outro numero secondNumber




