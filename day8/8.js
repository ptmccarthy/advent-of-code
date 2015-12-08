var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var rawStrings = contents.split('\n');

  // part 1
  countCharacters(rawStrings);

  // part 2
  encodeAndCount(rawStrings);
});

var countCharacters = function(rawStrings) {
  var codeCount = 0;
  var memoryCount = 0;

  rawStrings.forEach(function(rawString) {
    codeCount += rawString.length;
    memoryCount += calculateMemoryUsage(rawString);
  });

  var difference = codeCount - memoryCount;
  console.log('Part 1 Total Difference: ' + difference);
};

var calculateMemoryUsage = function(rawString) {
  var escaped;
  var unescaped = rawString.replace(/^"(.*)"$/, '$1');

  escaped = unescaped.replace(/\\\\/g, '\\');
  escaped = escaped.replace(/\\"/g, '"');
  escaped = escaped.replace(/\\x[0-9a-f][0-9a-f]/g, function(select) {
    var hexCode = select.replace('\\x', '');
    return String.fromCharCode('0x' + hexCode);
  });

  return escaped.length;
};

var encodeAndCount = function(rawStrings) {
  var rawCount = 0;
  var escapedCount = 0;

  rawStrings.forEach(function(rawString) {
    rawCount += rawString.length;
    escapedCount += countEscapedString(rawString);
  });

  var difference = escapedCount - rawCount;
  console.log('Part 2 Total Difference: ' + difference);
};

var countEscapedString = function(rawString) {
  var escaped;

  escaped = rawString.replace(/\\/g, '\\\\');
  escaped = escaped.replace(/"/g, '\\"');
  escaped = '"' + escaped + '"';

  return escaped.length;
}
