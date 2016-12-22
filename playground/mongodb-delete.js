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

  // delete many
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result.result);
  // });

  // delete one
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) =>{
  //   console.log(result.result);
  // });

  // find one and delete
  db.collection('Todos').findOneAndDelete({text: 'Eat Lunch'}).then((result) =>{
    console.log(result);
  });

  db.close();
});
