// look for groups of matching characters
// pass each group to say() and concatenate returns
var look = function(lookString) {
  var i = 0;
  var j = 1;
  var sayString = '';

  while (i < lookString.length) {
    while (lookString[i] === lookString[j]) {
      j++;
    }
    sayString += say(lookString.slice(i,j));
    i += (j - i);
  }

  return sayString;
}

// convert a group of matching characters to
// the replacement sequence
var say = function(group) {
  var output = 0;
  return '' + group.length + group[0];
}

// run look-and-say on a given input n times and
// print the result's length to the console.
var lookAndSay = function(input, n) {
  var lastString = input;
  for (var i = 0; i < n; i++) {
    lastString = look(lastString);
  }

  console.log(lastString.length);
}

lookAndSay('1321131112', 50);
