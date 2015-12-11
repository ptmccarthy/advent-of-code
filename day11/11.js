var input = 'cqjxjnds';

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

var incrementPassword = function(input) {

}

console.log(isValid(input));