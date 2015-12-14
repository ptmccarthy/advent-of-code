var fs = require('fs');
var _ = require('lodash');

var puzzleSeconds = 2503;

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var rawStrings = contents.split('\n');
  var reindeerList = createReindeer(rawStrings);

  var results = runRace(reindeerList, puzzleSeconds);

  // part 1
  console.log('Part 1 Winner (distance):');
  console.log(_.max(results, function(reindeer) { return reindeer.distance; }));

  // part 2
  console.log('Part 2 Winner (points):');
  console.log(_.max(results, function(reindeer) { return reindeer.points; }));
});

// create a list of reindeer objects to work with
var createReindeer = function(rawStrings) {
  var reindeerList = [];
  _.each(rawStrings, function(string) {
    var split = string.split(' ');
    var reindeer = {
      name: split[0],
      distance: 0,
      points: 0,
      v: parseInt(split[3]),
      vTime: parseInt(split[6]),
      restTime: parseInt(split[13])
    }

    reindeerList.push(reindeer);
  });

  return reindeerList;
};

// run the race, incrementing each second up to the race length
// on each tick, award distance and points
var runRace = function(reindeerList, seconds) {
  seconds = seconds;

  for (var i = 0; i < seconds; i++) {
    _.each(reindeerList, function(reindeer) {

      if (wasMoving(reindeer, i)) {
        reindeer.distance += reindeer.v;
      }
    });

    var leader = _.max(reindeerList, function(reindeer) { return reindeer.distance; });
    leader.points++;
  }

  return reindeerList;
};

// given a second in the race, determine if a reindeer was moving for that second
var wasMoving = function(reindeer, i) {
  var cycleTime = reindeer.vTime + reindeer.restTime;
  var cycleNumber = Math.floor(i / cycleTime);

  // offset the index by the length of the number of cycles completed already
  var j = i - (cycleTime * cycleNumber);

  if (j < reindeer.vTime) {
    return true;
  } else {
    return false;
  }
};
