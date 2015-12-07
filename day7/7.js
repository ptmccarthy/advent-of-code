var fs = require('fs');
var circuit = {};

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var raw = contents.split('\n');
  buildCircuit(raw);

  // part 1
  var part1 = evaluateWire('a');
  console.log('Part 1: Wire "a" signal evaluated to: ' + part1);

  // part 2
  circuit = {};
  buildCircuit(raw);
  circuit['b'].signal = part1;
  var part2 = evaluateWire('a');
  console.log('Part 2: Wire "a" signal evaluated to: ' + part2);
});

var buildCircuit = function(raw) {
  raw.forEach(function(instruction) {
    if (instruction.length > 0) {
      var gate = {};
      var split = instruction.split(' -> ');
      var input = split[0].split(' ');
      var wire = split[1];

      if (input.length === 1) {
        gate.signal = parseForInt(input[0]);
      } else if (input.length === 2) {
        gate.operator = input[0];
        gate.a = parseForInt(input[1]);
      } else {
        gate.operator = input[1];
        gate.a = parseForInt(input[0]);
        gate.b = parseForInt(input[2]);
      }

      circuit[wire] = gate;
    }
  });
};

// Attempt to parse a string for an int, returning the int
// or the original string if it is not an int.
var parseForInt = function(val) {
  var num = parseInt(val);
  return isNaN(num) ? val : num;
};

// Given an operator and inputs a & b, perform a bitwise operation.
var bitwiseOps = function(operator, a, b) {
  switch (operator) {
    case 'NOT':
      return ~ a;
    case 'AND':
      return a & b;
    case 'OR':
      return a | b;
    case 'LSHIFT':
      return a << b;
    case 'RSHIFT':
      return a >> b;
  }
};

// Recursively evaluate a wire for its signal, evaluating
// input wires as necessary.
var evaluateWire = function(wire) {
  var gate = circuit[wire];

  if (typeof gate.signal === 'string') {
    gate.signal = evaluateWire(gate.signal);
  }

  if (typeof gate.a === 'string') {
    gate.a = evaluateWire(gate.a);
  }

  if (typeof gate.b === 'string') {
    gate.b = evaluateWire(gate.b);
  }

  if (gate.operator) {
    gate.signal = bitwiseOps(gate.operator, gate.a, gate.b);
  }

  return gate.signal;
};
