// External JavaScript File - script.js

function externalFunction() {
    alert("External JavaScript Function Called!");
}

// Variables
let name = "John";
const age = 25;
var city = "New York";

console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// Functions
function greet(name) {
    return "Hello, " + name + "!";
}

// Objects
let person = {
    firstName: "Jane",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};