const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// jwt.sign
// jwt.verify
// var mess = 'Thuy Duyen';
// var hash = SHA256(mess).toString();
// console.log(`message: ${mess}`);
// console.log(`Hash: ${hash}`);

var data = {
  id:4
}
var token = jwt.sign(data,'Secret salt');
console.log(token.toString());
