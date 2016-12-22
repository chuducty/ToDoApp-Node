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

  // find one and update
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("585bfd70a41e18161ebc67f5")
  // },{
  //   $set: {
  //     completed : true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({
    name: "Thuan Duc Chu"
  },{
    $set: {
      name : "Thuan dep trai"
    },
    $inc: {
      age: 5
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  db.close();
});
