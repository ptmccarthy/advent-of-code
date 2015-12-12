var input = 'cqjxjndz';

// add a method to the String prototype to "replace" a character in a string
// at a given index. Strings are immutable, so actually return a new string.
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

// test if the string contains two different pairs of matching characters
var contains2Pairs = function(string) {
   var pairs = string.match(/(.)\1+/g);
   if (pairs) {
     return pairs.length > 1;
   } else {
     return false;
   }
}

// test if the string contains the characters 'i', 'o', or 'l'
var doesNotContainIOL = function(string) {
  return !(/[iol]/).test(string);
}

// test if the string contains a sequence of 3+ characters in alphabetic order
var containsAlphaSequence = function(string) {
  for (var i = 0; i < string.length - 2; i++) {
    var char1 = parseInt(string.charCodeAt(i));
    var char2 = parseInt(string.charCodeAt(i+1));
    var char3 = parseInt(string.charCodeAt(i+2));

    if ((char1 + 2) === (char2 + 1) && (char2 + 1) === char3) {
      return true;
    }
  }

  return false;
}

// test if a string meets all 3 required conditions
var isValid = function(string) {
  return (doesNotContainIOL(string) &&
          contains2Pairs(string) &&
          containsAlphaSequence(string));
}

// alphabetically increment the character at a given index
// if no index supplied, assume the end of the string.
// wraps a 'z' back to an 'a' which then increments index-1, etc.
var incrementCharacter = function(string, index) {
  if (!index) { index = string.length -1; }
  var charCode = parseInt(string.charCodeAt(index));

  if (charCode < 122) {
    charCode++;
    string = string.replaceAt(index, String.fromCharCode(charCode));
  } else {
    string = string.replaceAt(index, 'a');
    string = incrementCharacter(string, index-1);
  }

  return string;
}

// given an initial password, iterate until we find the next valid password
var findNextValidPassword = function(input) {
  var password = incrementCharacter(input);

  while (!isValid(password)) {
    password = incrementCharacter(password);
  }

  return password;
};

var part1 = findNextValidPassword(input);
var part2 = findNextValidPassword(part1);

console.log('Part 1 password: ' + part1);
console.log('Part 2 password: ' + part2);
