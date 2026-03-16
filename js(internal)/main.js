// main.js - Importing and using modules

import Calculator, { add, subtract, multiply, divide, PI } from './mathUtils.js';
import stringUtils, { capitalizeFirst, reverseString } from './stringUtils.js';

// Using named imports
console.log("Add: " + add(10, 5));
console.log("Subtract: " + subtract(10, 5));
console.log("Multiply: " + multiply(10, 5));
console.log("Divide: " + divide(10, 5));
console.log("PI: " + PI);

// Using default import
const calc = new Calculator("MyCalc");
console.log("Calculator result: " + calc.calculate('add', 20, 10));

// Using string utilities
console.log("Capitalized: " + capitalizeFirst("hello world"));
console.log("Reversed: " + reverseString("hello"));
console.log("Vowel count: " + stringUtils.countVowels("Hello World"));
console.log("Is palindrome? " + stringUtils.isPalindrome("racecar"));