// stringUtils.js - String manipulation functions

export function capitalizeFirst(str) {
    if(!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str) {
    if(!str) return str;
    return str.split('').reverse().join('');
}

export function countVowels(str) {
    if(!str) return 0;
    let matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

export function isPalindrome(str) {
    if(!str) return false;
    let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

export default {
    capitalizeFirst,
    reverseString,
    countVowels,
    isPalindrome
};