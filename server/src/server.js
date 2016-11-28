// Implement your server in this file.
// We should be able to run your server with node src/server.js
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

var bodyParser = require('body-parser');

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

app.use(express.static('../client/build'));


//put server functions here
function postFeedback(user, contents){
  var newFeedback = {
    "user": user,
    "contents": contents
  };
  newFeedback = addDocument('feedback', newFeedback);

  addDocument('feedback', newFeedback);

  //emulateServerReturn(newFeedback);
}









// Defines what happens when it receives the `GET /` request
app.get('/', function (req, res) {
res.send('Hello World!');
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

/**
* Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});




// Starts the server on port 3000!
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
