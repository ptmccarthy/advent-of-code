var CryptoJS = require('crypto-js');
var secretKey = 'bgvyzdsv';

var mine = function(secretKey) {
  var num = 0;
  var hash = CryptoJS.MD5(secretKey + num).toString(CryptoJS.enc.hex);

  while (hash.slice(0,6) !== '000000') {
    num++;
    hash = CryptoJS.MD5(secretKey + num).toString(CryptoJS.enc.hex);
  }

  console.log('Found hash ' + hash);
  console.log('Number added: ' + num);
}

mine(secretKey);
