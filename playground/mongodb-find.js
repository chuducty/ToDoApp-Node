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
  // db.collection('Todos').find({_id:new ObjectID("123")}).toArray().then((docs,err) => {
  //   if (err){
  //     console.log('error');
  //     return;
  //   }
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // });
  db.collection('Todos').find({_id:123}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("HUHU");
  });

  db.close();
});
