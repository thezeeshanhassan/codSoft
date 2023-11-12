"use strict";

var input = document.getElementById('input'), // Input/Output button
    number = document.querySelectorAll('.numbers div'), // Number buttons
    operator = document.querySelectorAll('.operators div'), // Operator buttons
    result = document.getElementById('result'), // Equal button
    clear = document.getElementById('clear'), // Clear button
    resultDisplayed = false; // Flag to keep an eye on what output is displayed

// Adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {

        // Storing current input string and its last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // If result is not diplayed, just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // If result is currently displayed and user pressed an operator
            // We need to keep on adding to the string for next operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // If result is currently displayed and user pressed a number
            // We need clear the input string and add the new input to start the new opration
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// Adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {

        // Storing current input string and its last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // If last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // If first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // Else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// On click of 'equal' button
result.addEventListener("click", function () {

    // This is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = input.innerHTML;

    // Forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    // Forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // First we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // Now we are looping through the array and doing one operation at a time.
    // First divide, then multiply, then subtraction and then addition
    // As we move we are alterning the original numbers and operators array
    // The final element remaining in the array will be the output

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        // Using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // Displaying the output

    resultDisplayed = true; // Turning flag if result is displayed
});

// Clearing the input on Press of Clear
clear.addEventListener("click", function () {
    input.innerHTML = "";
})