// Look for groups of matching characters.
// Map the conversion function to each.
// Join & return the new string.
var convert = function(input) {
  var groups = input.match(/(\d)\1*/g);
  return groups.map(s => s.length + s[0]).join('');
}

// run look-and-say on a given input n times and
// print the result's length to the console.
var lookAndSay = function(input, n) {
  var lastString = input;

  while (n) {
    lastString = convert(lastString);
    n--;
  }

  console.log(lastString.length);
}

lookAndSay('1321131112', 50);
