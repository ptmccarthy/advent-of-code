'use strict';
const fs = require('fs');
const _ = require('lodash');

const iterations = 100;
const part2 = true;

fs.readFile('input.txt', 'utf8', (error, contents) => {
  let gridState = contents.split('\n').map(row => row.split(''));

  // if running part2, turn on all corners in initial state
  if (part2) {
    gridState = turnOnCorners(gridState);
  }

  for (let i = 0; i < iterations; i++) {
    gridState = animateGrid(gridState);
  }

  console.log('Lights on at end: ' + countLightsOn(gridState));
});

// run the animation step on a grid
let animateGrid = function(currentState) {
  let nextState = [];
  let yLength = currentState.length;
  let xLength = currentState[0].length;

  for (let y = 0; y < yLength; y++) {
    for (let x = 0; x < xLength; x++) {
      let currentlyOn = currentState[y][x] === '#';
      let nextPower = '.';
      let adjacents = getAdjacents(x, y, xLength, yLength);

      let adjOn = adjacents.filter(point => {
        return currentState[point[1]][point[0]] === '#';
      });

      if (currentlyOn && _.contains([2,3], adjOn.length)) {
        nextPower = '#';
      }

      if (!currentlyOn && adjOn.length === 3) {
        nextPower = '#';
      }

      // first check that the "x" row exists for this "y" column
      if (!nextState[y]) {
        nextState[y] = [];
      }

      nextState[y][x] = nextPower;
    }
  }

  // if running part2, always turn on the four corners
  if (part2) {
    nextState = turnOnCorners(nextState);
  }

  return nextState;
};

let getAdjacents = function(x, y, xLength, yLength) {
  // create a naive list of the 8 adjacent points
  let adjacents = [
    [x-1, y-1],
    [x-1, y],
    [x-1, y+1],
    [x, y-1],
    [x, y+1],
    [x+1, y-1],
    [x+1, y],
    [x+1, y+1]
  ]

  // then filter out adjacent points that are not in our grid
  adjacents = adjacents.filter(point => {
    if (point[1] < 0 || point[1] >= xLength) {
      return false;
    }

    if (point[0] < 0 || point[0] >= yLength) {
      return false;
    }

    return true;
  });

  return adjacents;
}

// count the number of lights that are on in a grid
let countLightsOn = function(grid) {
  let count = 0;

  grid.forEach(y => {
    y.forEach(x => {
      if (x === '#') {
        count++;
      }
    });
  });

  return count;
}

// turn on the 4 corners of a grid
let turnOnCorners = function(gridState) {
  let maxY = gridState.length - 1;
  let maxX = gridState[0].length -1;
  gridState[0][0] = '#';
  gridState[0][maxX] = '#';
  gridState[maxY][0] = '#';
  gridState[maxY][maxX] = '#';
  return gridState;
}