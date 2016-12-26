var {mongoose} = require('./../server/db/mongoose.js');
var {Todo} = require('./../server/models/todo.js');
var {ObjectID} = require('mongodb');


var id = '585c3d0b9423c88b20d025ea';

if (!ObjectID.isValid(id)){
  console.log('ID not valid');
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
//   console.log('Todo by Id', todo)
// }).catch((e) => console.log(e));
Todo.find({
  $or: [{text:'Cook Dinner'}, {text:'Cook Lunch'}]
}).then((todos) => {
  console.log(todos);
});
