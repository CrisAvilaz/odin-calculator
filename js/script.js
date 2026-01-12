// Escopo Global

calculator = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    shouldResetDisplay: false
}

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

//integração

buttons.addEventListener("click", (event) => {
    const button = event.target;

    if (button.tagName !== "BUTTON") return;

    const value = button.textContent;

        if (value === "AC"){
        handleClear();
        return;
    }

        if (button.classList.contains("equals")){
        handleEquals();
        return;
    }

    if (button.classList.contains("operator")){
        handleOperatorClick(value);
        return;
    }

    handleNumberClick(value);
});

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

    const result = operations[operator](
        Number(firstNumber),
        Number(secondNumber)
    );

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
