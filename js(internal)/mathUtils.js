// mathUtils.js - Exporting functions

// Named exports
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if(b === 0) throw new Error("Cannot divide by zero");
    return a / b;
}

// Constant export
export const PI = 3.14159;

// Default export
export default class Calculator {
    constructor(name) {
        this.name = name;
    }
    
    calculate(operation, a, b) {
        switch(operation) {
            case 'add': return add(a, b);
            case 'subtract': return subtract(a, b);
            case 'multiply': return multiply(a, b);
            case 'divide': return divide(a, b);
            default: throw new Error("Invalid operation");
        }
    }
}