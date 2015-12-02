var fs = require('fs');
var inputString;

// Read input file, expecting only "(" and ")" on the first line.
fs.readFile('input.txt', 'utf8', function(err, contents) {
  inputString = contents.split('\n')[0];
  parseInput(inputString);
});

// Parse the input string of parentheses.
// Opening paren = go up one floor
// Closing paren = go down one floor
var parseInput = function(inputString) {
  var floor = 0;
  var charAtIndex;
  var basementEntered = false;
  for (var i = 0; i < inputString.length; i++) {
    charAtIndex = inputString.charAt(i);
    if (charAtIndex === '(') {
      floor++;
    } else if (charAtIndex === ')') {
      floor--;
    } else {
      console.error('Encountered unexpected character "' + charAtIndex + '" in input string!');
    }

    // Check for part two (first time entering the basement)
    // Note "position" is 1-based, and the index is 0-based, so add 1 to index for position
    if (floor < 0 && !basementEntered) {
      basementEntered = true;
      console.log('Entered basement first time at position ' + (i + 1));
    }
  }

  console.log('Go to floor ' + floor);
};
