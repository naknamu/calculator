const add = function(num1, num2) {
    return num1 + num2;
}

const subtract = function(num1, num2) {
    return num1 - num2;
}

const multiply = function(num1, num2) {
    return num1 * num2;
}

let snarkyMessage = "yo MoM so BIG!";

const divide = function(num1, num2) {
    if (num2 === 0)
    {
        return snarkyMessage;
    } else {
    let answer = num1 / num2;
    return Math.round (answer* 1000000000000) / 1000000000000;
    }
}

const operate = function(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            break;
    }
}

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('BUTTON');
const dotButton = document.querySelector('#dot');

let firstInput = "";
let secondInput = "";
let operator = "";
let checkOperator = false;
let checkEquals = false;
let num1,num2, solution, newDisplay;

//for the numbers button
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.id)
        {
            case 'one':
                !checkOperator ? firstInput += "1" : secondInput += '1';      
                break;
            case 'two':
                !checkOperator ? firstInput += "2" : secondInput += '2'; 
                break;
            case 'three':
                !checkOperator ? firstInput += "3" : secondInput += '3'; 
                break;
            case 'four':
                !checkOperator ? firstInput += "4" : secondInput += '4'; 
                break;
            case 'five':
                !checkOperator ? firstInput += "5" : secondInput += '5'; 
                break;
            case 'six':
                !checkOperator ? firstInput += "6" : secondInput += '6'; 
                break;
            case 'seven':
                !checkOperator ? firstInput += "7" : secondInput += '7'; 
                break;
            case 'eight':
                !checkOperator ? firstInput += "8" : secondInput += '8'; 
                break;
            case 'nine':
                !checkOperator ? firstInput += "9" : secondInput += '9'; 
                break;
            case 'zero':
                !checkOperator ? firstInput += "0" : secondInput += '0'; 
                break;
            case "add":
                //enable dot button
                dotButton.disabled = false;
                //flag to check if the operator has been pressed already
                //initially checkOperator is false, so if it's pressed the second time around
                //an operation will be performed automatically
                //the solution(answer) will become the firstInput value if the user 
                //would like to calculate a number again
                if (!checkOperator) {    
                    //if pressed for the first time then 
                    //the next number input from the user will be stored to secondInput
                    operator = '+';
                    checkOperator = true;
                } else {
                    //if pressed the second time, then perform operation
                    solution = operate(operator, num1, num2);
                    firstInput = solution;
                    operator = '+';
                    secondInput = "";
                    //since an operator is used to perform an operation instead of equals
                    //make checkEquals to false
                    checkEquals = false;
                }
                break;
            case "subtract":
                //enable dot button
                dotButton.disabled = false;
                if (!checkOperator) {
                    operator = '-';
                    checkOperator = true;
                } else {
                    solution = operate(operator, num1, num2);
                    firstInput = solution;
                    operator = '-';
                    secondInput = "";
                    checkEquals = false; 
                }
                break;
            case "multiply":
                //enable dot button
                dotButton.disabled = false;
                if (!checkOperator) {
                    operator = 'x';
                    checkOperator = true;
                } else {
                    solution = operate(operator, num1, num2);
                    firstInput = solution;
                    operator = 'x';
                    secondInput = "";
                    checkEquals = false; 
                }
                break;
            case "divide":
                //enable dot button
                dotButton.disabled = false;
                if (!checkOperator) {
                    operator = '/';
                    checkOperator = true;
                } else {
                    solution = operate(operator, num1, num2);
                    firstInput = solution;
                    operator = '/';
                    secondInput = "";
                    checkEquals = false; 
                }
                break;
            case 'equals':
                //enable dot button
                dotButton.disabled = false;
                checkEquals = true;
                checkOperator = false;
                solution = operate(operator, num1, num2);
                //reset values
                firstInput = solution;
                operator = "";
                secondInput = "";
                break;
            case 'clear':
                //wipe out any existing data
                firstInput = "";
                secondInput = "";
                operator = "";
                checkOperator = false;
                checkEquals = false;
                num1, num2, solution = 0;
                //enable all buttons if disabled
                buttons.forEach((button) => {
                    button.disabled = false;
                })
                break;
            case 'dot':
                //let users input decimals
                //disable button if there's already one in the display
                !checkOperator ? firstInput += "." : secondInput += '.'; 
                button.disabled = true;
                break;
            case 'backspace':
                //user can undo if they click the wrong number
                if (firstInput !== "" && firstInput !== undefined && !checkOperator)
                {
                    newDisplay =  firstInput.slice(0, firstInput.length-1);
                    firstInput = newDisplay;
                    console.log("delete firstInput!");
                } else if (firstInput !== "" && secondInput === "" && checkOperator) {
                    newDisplay = operator.slice(0, operator.length-1);
                    operator = newDisplay;
                    checkOperator = false;
                    console.log("delete operator!");
                } else if (secondInput !== "") {
                    newDisplay = secondInput.slice(0, secondInput.length-1);
                    secondInput = newDisplay;
                    console.log("delete secondInput!");
                } else{
                    console.log("nothing to delete!");
                }
                break;
        }
        //display the input to the screen
        console.log("first: "+ firstInput);
        console.log("operator: "+ operator);
        console.log("second: "+ secondInput);
        console.log("solution: "+ solution);
        console.log("checkOperator: "+ checkOperator);

        //convert string to floating point value
        num1 = parseFloat(firstInput);
        num2 = parseFloat(secondInput);
        // console.log('num1: '+ num1);
        // console.log('num2: '+ num2);

        //display input to screen dependin on multiple conditions
        //if equals is pressed and first input is not empty and undefined
        if (checkEquals && firstInput !== "" && firstInput !== undefined) {
            checkEquals = false;
            display.textContent = solution;
        }
        //if equals is pressed first before entering all the numbers and operator
        else if ((checkEquals || checkOperator) && (firstInput === "" || firstInput === undefined)) {
            display.textContent = "Math Error!";
        }
        //display only a single pair of numbers at a time
        else {
            display.textContent = firstInput + operator + secondInput;
        }

        //special case
        if (solution === snarkyMessage || Number.isNaN(solution)) {
            buttons.forEach((button) => {
             if (button.id !== 'clear') {
                button.disabled = true;
             }
            })
        }
    })
})

