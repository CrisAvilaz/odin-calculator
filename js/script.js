// Escopo Global

const calculator = {
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

const operations = Object.freeze({
       "+": add,
       "-": substract,
       "*": multiply,
       "/": divide
});

// elementos DOOM
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");


function updateDisplay(value) {
    display.textContent = String(value);
}

function formatResult(value){
    if (!Number.isFinite(value)) return "Error";

    if (Number.isInteger(value)) return value;

    return Math.round(value * 1000) / 1000;
}

// animação

function animateKey(key){
    const button = document.querySelector(`button[data-key="${key}"]`);
    if (!button) return;

    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 80);
}

//integração

buttons.addEventListener("click", (event) => {
    const button = event.target;
    if (button.tagName !== "BUTTON") return;

    const key = button.dataset.key;
    animateKey(key);

        if (key in operations) return handleOperatorClick(key);
        if ( key === "=") return handleEquals();
        if (key === "Backspace") return handleBackspace();
        if (key === "Escape") return handleClear();
        
        handleNumberClick(key);
});


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

    return true;
}


// Opera os inputs validados

function operate(){

    const {firstNumber, operator, secondNumber} = calculator;

    if (!isValid()) return "Error";

    const a = Number(firstNumber);
    const b = Number(secondNumber);

    if (operator === "/" && b === 0 ) {
        calculator.shouldResetDisplay = true;
        return "not so smart 😅";
    }
    const result = operations[operator](a, b);
    return formatResult(result);
}

// Listeners de inputs

function handleNumberClick(digit){
    const currentValue = display.textContent;

    // numeros decimais
    if (digit === "."){
        if (currentValue.includes(".")) return;

        if (currentValue === "0" || calculator.shouldResetDisplay) {
            updateDisplay ("0.");
            calculator.shouldResetDisplay = false;
        } else {
            updateDisplay(currentValue + ".");
        }
        // numeros normais
        } else {
            if (calculator.shouldResetDisplay){
                updateDisplay(digit);
                calculator.shouldResetDisplay = false;
            } else if (display.textContent === "0") {
                    updateDisplay(digit);
            } else {
                    updateDisplay(currentValue + digit);
            }
        }

        // atualiza o estado global
        if (calculator.operator === null){
          calculator.firstNumber = display.textContent;
        } else {
          calculator.secondNumber = display.textContent;
        }
}

function handleOperatorClick(op){
    if (op === "×") op = "*";
    if (op === "÷") op = "/";

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

function handleKeyPress(event){
    const key = event.key;
    animateKey(key);

    if (key >= "0" && key <= "9"){
        handleNumberClick(key);
        return;
    }
    if (key === "."){
        handleNumberClick(".");
        return;
    }
    if (key in operations){
        handleOperatorClick(key);
        return;
    }
    if (key === "Enter" || key === "="){
        handleEquals();
        return;
    }
    if (key === "Escape"){
        handleClear();
        return;
    }
    if (key === "Backspace"){
        handleBackspace();
        return;
    }                                                                                                                                                                   
}

function handleBackspace(){
    if(calculator.shouldResetDisplay) return;

    let currentValue = display.textContent;

    if (currentValue.length === 1){
        updateDisplay("0");
    } else {
        updateDisplay(currentValue.slice(0, -1));
    }
    if (calculator.operator === null) {
        calculator.firstNumber = display.textContent;
    } else {
        calculator.secondNumber = display.textContent;
    }
}

document.addEventListener("keydown", handleKeyPress);
 

