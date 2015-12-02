var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
  var lines = contents.split('\n');
  var packageStrings = [];

  // ensure we don't get any empty lines (like a trailing newline)
  lines.forEach(function(line) {
    if (line.length) { packageStrings.push(line) };
  });

  calculateWrappingPaper(packageStrings);
});

var calculateWrappingPaper = function(packageStrings) {
  var packages = [];

  packageStrings.forEach(function(pkgString) {
    packages.push(parseDimensions(pkgString));
  });

  console.log('Square Feet of Wrapping Paper: ' + sumAreas(packages));
  console.log('Feet of Ribbon: ' + sumRibbonLength(packages));
};

// take a package string in the form of 'lxwxh' and parse it
// into its consituent integers
var parseDimensions = function(pkg) {
  var split = pkg.split('x');
  var box = {};

  // basic sanity check
  if (split.length !== 3) {
    console.error('Parsed an invalid package: ' + pkg +'. Expecting format "lxwxh"!')
  }

  box.l = parseInt(split[0]);
  box.w = parseInt(split[1]);
  box.h = parseInt(split[2]);
  box.smallestSideArea = findSmallestSideArea([box.l, box.w, box.h]);
  box.shortestDistanceAround = findShortestDistance([box.l, box.w, box.h])
  box.wrappingArea = calculateWrappingArea(box);
  box.ribbonLength = calculateRibbonLength(box);

  return box;
};

// given an array of [l,w,h], calculate the area of the smallest side and return it
var findSmallestSideArea = function(dimensions) {
  var area;
  var max = Math.max.apply(Math, dimensions);
  var maxIndex = dimensions.indexOf(max);

  // remove the largest size from the dimensions array
  dimensions.splice(maxIndex, 1);

  // return the area by multiplying the remaining sides
  return dimensions[0] * dimensions[1];
};

// given a box with l,w,h and smallestArea calculate how much paper is
// required to wrap the box
var calculateWrappingArea = function(box) {
  // surface area of a box = 2*l*w + 2*w*h + 2*h*l
  var surfaceArea = 2 * ((box.l * box.w) + (box.w * box.h) + (box.h * box.l));

  // required wrapping paper = surface area + slack of smallest side's area
  return surfaceArea + box.smallestSideArea;
};

var findShortestDistance = function(dimensions) {
  var area;
  var max = Math.max.apply(Math, dimensions);
  var maxIndex = dimensions.indexOf(max);

  // remove the largest size from the dimensions array
  dimensions.splice(maxIndex, 1);

  return 2 * (dimensions[0] + dimensions[1]);
};

// bow length = shortestDistanceAround + cubic volume of the box (l*w*h)
var calculateRibbonLength = function(box) {
  var volume = box.l * box.w * box.h;
  return box.shortestDistanceAround + volume;
};

// sum the wrappingAreas of all packages
var sumAreas = function(packages) {
  var sum = 0;

  packages.forEach(function(box) {
    sum += box.wrappingArea;
  });

  return sum;
};

// sum the required ribbonLength of all packages
sumRibbonLength = function(packages) {
  var sum = 0;

  packages.forEach(function(box) {
    sum += box.ribbonLength;
  });

  return sum;
}
