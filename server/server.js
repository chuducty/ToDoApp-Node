var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var port = process.env.PORT || 3000


var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js')
var {Todo} = require('./models/todo.js')
var {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate.js')

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

// create new todos
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

// delete todo
app.post('/todos/delete/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    res.status(404).send('Bad request :<');
    return;
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      res.send('Cannot find the todo');
    }
    res.send('Todo removed');
    console.log(todo);
  }).catch((e) =>{
    res.status(404).send('Some Error');
  });
});

// update todo
app.post('/todos/update', (req, res) => {
  //var body = _pick(req.body,['text','completed','_id']);
  console.log('ahihi');
  var body = _.pick(req.body,['_id','text','completed']);
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate({
    _id: body._id
  },{
    $set: {
      text : body.text,
      completed : body.completed,
      completedAt : body.completedAt
    }
  },{
    new: true
  }).then((todo) => {
    console.log(todo);
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });

});

// POst /Users
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then(() => {
    // res.send(user);
    // console.log(user._id.toHexString());
    // console.log(user._id);
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});



// app.get('/users/me', (req,res) => {
//   var token = req.header('x-auth');
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       return Promise.reject();
//     }
//     res.send(user);
//   }).catch((e) => {
//     res.status(401).send();
//   });
// });

app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});
