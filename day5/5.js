var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var strings = contents.split('\n');

  testPart1Behavior(strings);
  testPart2Behavior(strings);
});

var testPart1Behavior = function(strings) {
  var allowed = containsDisallowedStrings(strings);
  var allowedAndRepeats = containsRequiredRepeats(allowed);
  var good = containsThreeVowels(allowedAndRepeats);

  console.log('Part 1 nice strings: ' + good.length);
};

var testPart2Behavior = function(strings) {
  var containsPairs = containsNonOverlappingPairs(strings);
  var good = containsOffsetRepeats(containsPairs);

  console.log('Part 2 nice strings: ' + good.length);
}

var containsThreeVowels = function(strings) {
  var vowels = 'aeiou';
  var stringsWithVowels = [];

  strings.forEach(function(string) {
    var count = 0;
    for (var i = 0; i < string.length; i++) {
      if (vowels.includes(string.charAt(i))) { count++; }
    }
    if (count >= 3) { stringsWithVowels.push(string); }
  });

  return stringsWithVowels;
};

var containsRequiredRepeats = function(strings) {
  var stringsWithRepeats = [];

  strings.forEach(function(string) {
    if (/(.)\1+/.test(string)) {
      stringsWithRepeats.push(string);
    }
  });

  return stringsWithRepeats;
};

var containsDisallowedStrings = function(strings) {
  var allowed = [];
  strings.forEach(function(string) {
    if (!/(ab|cd|pq|xy)/.test(string)) {
      allowed.push(string);
    }
  });

  return allowed;
};

var containsNonOverlappingPairs = function(strings) {
  var stringsWithPairs = [];

  strings.forEach(function(string) {
    for (var i = 0; i < string.length-1; i++) {
      var pair = string[i] + string[i+1];
      var rest = string.slice(i+2);
      if (rest.includes(pair)) {
        stringsWithPairs.push(string);
        break;
      }
    }
  });

  return stringsWithPairs;
};

var containsOffsetRepeats = function(strings) {
  var stringsWithRepeats = [];

  strings.forEach(function(string) {
    var contains = false;
    for (var i = 0; i < string.length-2; i++) {
      if (string[i] === string[i+2]) {
        contains = true;
      }
    }
    if (contains) {
      stringsWithRepeats.push(string);
    }
  });

  return stringsWithRepeats;
};
