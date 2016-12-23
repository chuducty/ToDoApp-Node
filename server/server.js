var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000


var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js')
var {Todo} = require('./models/todo.js')
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req,res) => {
  //res.send(req.params);
  //console.log(req.query);
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  //console.log(typeof(id));
  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.send('Todo not found');
    }
    res.send(JSON.stringify(todo, undefined, 3));
  }).catch((e) => {
    res.status(400).send();
  });
});


app.post('/todos', (req,res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});
