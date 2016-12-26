var {mongoose} = require('./../server/db/mongoose.js');
var {Todo} = require('./../server/models/todo.js');
var {ObjectID} = require('mongodb');


var id = '585c3d0b9423c88b20d025ea';

if (!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
// Todo.findOneandRemove({})

Todo.findByIdAndRemove('58603400f3f89274055ba5c3').then((todo) => {
  console.log(todo);
});
