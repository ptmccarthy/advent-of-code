'use strict';
const fs = require('fs');
const _ = require('lodash');

// the sue that gave the gift
const giftingSue = {
  'children': 3,
  'cats': 7,
  'samoyeds': 2,
  'pomeranians': 3,
  'akitas': 0,
  'vizslas': 0,
  'goldfish': 5,
  'trees': 3,
  'cars': 2,
  'perfumes': 1,
};

fs.readFile('input.txt', 'utf8', function(error, contents) {
  let split = contents.split('\n');
  let sues = parseSues(split);
  console.log('Part 1: ' + JSON.stringify(solvePart1(sues, giftingSue)));
  console.log('Part 2: ' + JSON.stringify(solvePart2(sues, giftingSue)));
});

// parse input to create sue objects with their properties
let parseSues = function(rawLines) {
  let sues = rawLines.map(line => {
    let parts = line.split(',').map(part => part.trim().split(': '));
    let numbers = parts[0].shift().split(' ');

    return {
      number: parseInt(numbers[1]),
      [parts[0][0]]: parseInt(parts[0][1]),
      [parts[1][0]]: parseInt(parts[1][1]),
      [parts[2][0]]: parseInt(parts[2][1])
    }
  });

  return sues;
};

let solvePart1 = function(sues, giftingSue) {
  return sues.filter(sue => {
    return Object.keys(sue).filter(num => num !== 'number')
                 .every(property => {
                   return sue[property] === giftingSue[property]
                 });
  });
};

let solvePart2 = function(sues, giftingSue) {
  return sues.filter(sue => {
    return Object.keys(sue).filter(num => num !== 'number')
                 .every(property => {
                   switch (property) {
                     case 'cats':
                     case 'trees':
                       return sue[property] > giftingSue[property];
                       break;
                     case 'pomeranians':
                     case 'goldfish':
                       return sue[property] < giftingSue[property];
                       break;
                     default:
                       return sue[property] === giftingSue[property];
                   }
                 });
  });
};
