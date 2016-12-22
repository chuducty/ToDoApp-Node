//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// connection string
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    console.log('Unable to connect to MongoDB server');
    return;
  }
  console.log('Connect to MongoDb server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err){
  //     console.log('Unable to insert Todo',err);
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Thuan Duc Chu',
  //   age: 19,
  //   location: 'Ho Chi Minh city'
  // }, (err, result) => {
  //   if (err){
  //     console.log('Unable to insert to Todo',err);
  //     return;
  //   }
  //   //console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
