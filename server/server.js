var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000


var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js')
var {Todo} = require('./models/todo.js')

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
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
