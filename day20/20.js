'use strict';
const input = 36000000;

let presents1 = [];
let presents2 = [];

for (let i = 1; i < input / 10; i++) {
  let visited = 0;

  for (let j = i; j < input / 10; j = j + i) {
    if (!presents1[j]) {
      presents1[j] = 10;
    }
    presents1[j] = presents1[j] + i * 10;

    if (visited < 50) {
      if (!presents2[j]) {
        presents2[j] = 11;
      }

      presents2[j] = presents2[j] + i * 11;
      visited++;
    }
  }
}

let partOne = presents1.reduce((min, current, index) => (min === 0 && current >= input) ? min = index : min, 0);
let partTwo = presents2.reduce((min, current, index) => (min === 0 && current >= input) ? min = index : min, 0);

console.log('Part 1: ' + partOne);
console.log('Part 2: ' + partTwo);
