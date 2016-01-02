'use strict';
const input = 36000000;

let calculatePresents = function(n) {
  let presents = 0;

  for (var i = 1; i <= n; i++) {
    if (n % i === 0) {
      presents += (10 * i);
    }
  }
  return presents;
};

for (var i = 800000; i <= input; i++) {
  if (calculatePresents(i) > input) {
    console.log('house: ' + i);
    break;
  }
}
