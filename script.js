const display = document.getElementById("display");
const additionalPlaceholder = document.getElementById("additional-placeholder");

const operatorsSet = new Set(["+", "-"]);
const priorityOperators = new Set(["*", "/"]);
const specialKeys = new Set(["=", "+", "-", "*", "/", ".", "%"]);
let isNewExpression = false;
let isSignMinusChanged = false;

window.addEventListener("myCustomEvent", processInput);

function processInput(event) {
    const input = event.detail.input;
    const isOperatorsSet = operatorsSet.has(input);
    const isSpecialKey = specialKeys.has(input);
    const isLastInputSpecialKey = specialKeys.has(display.value[display.value.length - 1]);

    //Erase result when type new expression
    if (isNewExpression && display.value !== "") {
        if (!specialKeys.has(input)) {
            additionalPlaceholder.innerHTML += " = " + display.value;
            display.value = "";
            isNewExpression = false;
        } else {
            isNewExpression = false
        }
    }

    // Handling input in the calculation
    if (input === "Esc") {
        cleanOutputs(); // Clear the outputs
    } else if (input === "back") {
        backspace(); // Remove the last character
    } else if (isSpecialKey) {
        handleSpecialKey();
    } else {
        addInput(); // Add numbers
    }

    function handleSpecialKey() {
        if (isLastInputSpecialKey && display.value[display.value.length - 1] !== "%") {
            if (input === "-" && input !== display.value[display.value.length - 1] && !isSignMinusChanged) {
                handleDecimalOrPercentageInput();
            } else if (input === "-"  && display.value[display.value.length - 1] === "-" || isSignMinusChanged) {
                if (!isSignMinusChanged) {
                    display.value = display.value.slice(0, -1) + "+";
                    isSignMinusChanged = true;
                } else {
                    display.value = display.value.slice(0, -1) + "-";
                    isSignMinusChanged = false;
                }

            }
            console.log("Warn!! need a number"); // Last special key can only be %
        } else if (!isOperatorsSet && display.value.length === 0) {
            console.log("Can't be first"); // Special key cannot be first
        } else if (input === "." || input === "%") {
            handleDecimalOrPercentageInput();
        } else if (input === "=") {
            calculate(display.value); // Calculate the result
        } else {
            addInput(); // Add operations
        }
    }

    function handleDecimalOrPercentageInput() {
        // Split the current display value by operators
        const parts = input === "-" ? display.value.split(/[+*\/]/) : display.value.split(/[+\-*\/]/);
        // Get the last part
        const lastPart = parts[parts.length - 1];
        // Check if the last part already contains a dot
        if (lastPart.includes(".") || lastPart.includes("%") || lastPart.includes("-")) {
            console.log("Can't be double"); // If it does, don't add another dot
        } else {
            addInput(); // Add the dot
        }
    }

    function addInput() {
        display.value += input;
    }

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    function cleanOutputs() {
        display.value = "";
        additionalPlaceholder.innerHTML = "";
        isSignMinusChanged = false;
    }
}

function calculate(expression) {

    const numbers = [];
    const operations = [];
    let currentNumber = "";
    for (let i = 0; i < expression.length; i++) {
        if (i !== 0 && (operatorsSet.has(expression[i]) || priorityOperators.has(expression[i]))) {
            if (specialKeys.has(expression[i-1]) && operatorsSet.has(expression[i])) {
                currentNumber += expression[i];
            } else {
                operations.push(expression[i]);
                addCurrentNumber();
            }
        } else {
            //add number to numbers array
            currentNumber += expression[i];
        }
        //add last number to numbers array
        if (i === expression.length - 1) {
            addCurrentNumber();
        }
    }

    // priorityCalculate
    for (let i = 0; i < operations.length; i++) {
        if (priorityOperators.has(operations[i])) {
            switch (operations[i]) {
                case "*" :
                    numbers.splice(i, 2, parseFloat(numbers[i]) * parseFloat(numbers[i + 1]));
                    operations.splice(i, 1);
                    i--;
                    break;
                case "/" :
                    numbers.splice(i, 2, parseFloat(numbers[i]) / parseFloat(numbers[i + 1]));
                    operations.splice(i, 1);
                    i--;
                    break;
            }
        }
    }

    // normalCalculate
    let count = 0;
    while (numbers.length > 1 && operations.length > 0) {
        switch (operations[count]) {
            case "+" :
                numbers.splice(0, 2, parseFloat(numbers[0]) + parseFloat(numbers[1]));
                break;
            case "-" :
                numbers.splice(0, 2, parseFloat(numbers[0]) - parseFloat(numbers[1]));
                break;
        }
        count++;
    }
    additionalPlaceholder.innerHTML = display.value;


    //Add result
    display.value = Number.isInteger(numbers[0]) ? numbers[0].toFixed(0) : (numbers[0].toFixed(6))
        .replace(/\.?0+$/, "");

    isNewExpression = true;

    function addCurrentNumber() {
        const previousNumber = numbers[length]

        function calculatePercentage() {
            currentNumber = previousNumber / 100 * currentNumber.replace("%", "");
        }

        if (currentNumber.includes("%")) {
            calculatePercentage();
        }
        numbers.push(currentNumber);
        currentNumber = "";
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Enter" || key === "Escape" || key === "Backspace" || specialKeys.has(key) || /^\d$/.test(key)) {
        event.preventDefault();
        myEvent(key === "Enter" ? "=" : key === "Escape" ? "Esc" : key === "Backspace" ? "back" : key);
    } else {
        event.preventDefault();
    }
});


function myEvent(message) {
    window.dispatchEvent(new CustomEvent("myCustomEvent", {detail: {input: message}}));
}

