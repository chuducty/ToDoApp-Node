const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var pass = 'secret123';
bcrypt.genSalt(12, (err, salt) => {
  console.log(`Salt: ${salt}`)
  bcrypt.hash(pass, salt, (err, hash) => {
    console.log(`Hash: ${hash}`);
  })
});
var hpass = '$2a$12$jOXB3fi0ybgyqUhpQofM.e7G4QJsUi01vqFhCL6JidrADeUPzxh6C';

bcrypt.compare(pass, hpass, (err, res) => {
  console.log(res);
});
// jwt.sign
// jwt.verify
// var mess = 'Thuy Duyen';
// var hash = SHA256(mess).toString();
// console.log(`message: ${mess}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id:4
// }
// var token = jwt.sign(data,'Secret salt');
//
// console.log(token.toString());
//
// var decoded = jwt.verify(token,'Secret salt');
// console.log(decoded);
