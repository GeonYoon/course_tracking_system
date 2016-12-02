// Implement your server in this file.
// We should be able to run your server with node src/server.js
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var validate = require('express-jsonschema').validate;
var SavedGraphSchema = require('./schemas/savedgraph.json');

var bodyParser = require('body-parser');

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
// app.use(bodyParser.json());

app.use(express.static('../client/build'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//put server functions here
function postFeedback(user, contents){
  var newFeedback = {
    "user": user,
    "contents": contents
  };
  newFeedback = addDocument('feedback', newFeedback);

  addDocument('feedback', newFeedback);

  return newFeedback;
  //emulateServerReturn(newFeedback);
}

function postSavedGraph(user, graphName, newIMG) {
var newSaved = {
  "name": graphName,
  "time": (new Date).getTime(),
  "image": newIMG
};
var newNew = readDocument('savePage', readDocument('users',user).savedGraphs);
newNew['pages'].push(newSaved);
writeDocument('savePage', newNew);
console.log("Should have saved graph to server");
return newNew;
}
app.post('/savedgraph', validate({ body: SavedGraphSchema }), function(req, res) {
var body = req.body;
var fromUser = getUserIdFromToken(req.get('Authorization'));
var userId = parseInt(body.userId, 10);
console.log(fromUser + " " +userId+ " "+body.userId);
// Check if requester is authorized to post this status update.
// (The requester must be the author of the update.)
if (fromUser === userId) {
var newSavedGraph = postSavedGraph(body.userId, body.graphName, body.contents);
// When POST creates a new resource, we should tell the client about it
// in the 'Location' header and use status code 201.
res.status(201);
// Send the update!
res.send(newSavedGraph);
} else {
// 401: Unauthorized.
res.status(401).end();
}
});

function getUserData2(user) {
  var userData = getUserItemSync(user);
  return userData;
}


function getUserItemSync(userId) {
  var user = readDocument('users', userId);
  user.majors = user.majors.map((id) => getMajorItemSync(id));
  user.minors = user.minors.map((id) => getMajorItemSync(id));
  user.classesTaken = user.classesTaken.map((id) => getCourseItemSync(id));
  user.nextSemester = user.nextSemester.map((id) => getCourseItemSync(id));
  user.shown_minors = user.shown_minors.map((id) => getMajorItemSync(id));
  user.shown_majors = user.shown_majors.map((id) => getMajorItemSync(id));
  return user;
}

function getMajorItemSync(majorId){
  var majorItem = readDocument('majors', majorId);
  majorItem.courses = majorItem.courses.map((id) => getCourseItemSync(id));
  return majorItem;
}

function getCourseItemSync(courseId){
  var courseItem = readDocument('courses', courseId);
  courseItem.prereqs = courseItem.prereqs.map((id) => getCourseItemSync(id));
  return courseItem;
}


/**
* Get the data for a particular user.
*/
app.get('/user/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    // Send response.
    res.send(getUserData2(userid));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

/**
* Get the data for a course.
*/

app.get('/courses/:course', function(req, res){
    res.send(getCourseData(req.params.course));
})

function getCourseData(courseId){
  var courseItem = readDocument('courses', courseId);
  return courseItem;
}

/**
* Get the user ID from a token. Returns -1 (an invalid ID)
* if it fails.
*/
function getUserIdFromToken(authorizationLine) {
try {
// Cut off "Bearer " from the header value.
var token = authorizationLine.slice(7);
// Convert the base64 string to a UTF-8 string.
var regularString = new Buffer(token, 'base64').toString('utf8');
// Convert the UTF-8 string into a JavaScript object.
var tokenObj = JSON.parse(regularString);
var id = tokenObj['id'];
// Check that id is a number.
if (typeof id === 'number') {
return id;
} else {
// Not a number. Return -1, an invalid ID.
return -1;
}
} catch (e) {
// Return an invalid ID.
return -1;
}
}

// Reset database.
app.post('/resetdb', function(req, res) {
console.log("Resetting database...");
// This is a debug route, so don't do any validation.
database.resetDatabase();
// res.send() sends an empty response with status code 200
res.send();
});

//add shown major
app.put('/user/:userid/majortoshow/:majorid', function(req, res) {
var fromUser = getUserIdFromToken(req.get('Authorization'));
// Convert params from string to number.
var userId = parseInt(req.params.userid, 10);
var majorId = parseInt(req.params.majorid, 10);
if (fromUser === userId) {
var userItem = readDocument('users', userId);
userItem.shown_majors.push(majorId);
writeDocument('users', userItem);
// Return a resolved version of the likeCounter
res.send(userItem.shown_majors.map((majId) =>
readDocument('majors', majId)));
} else {
// 401: Unauthorized.
res.status(401).end();
}
});

//add shown minor
app.put('/user/:userid/minortoshow/:minorid', function(req, res) {
var fromUser = getUserIdFromToken(req.get('Authorization'));
// Convert params from string to number.
var userId = parseInt(req.params.userid, 10);
var minorId = parseInt(req.params.minorid, 10);
if (fromUser === userId) {
var userItem = readDocument('users', userId);
userItem.shown_minors.push(minorId);
writeDocument('users', userItem);
// Return a resolved version of the likeCounter
res.send(userItem.shown_minors.map((majId) =>
readDocument('majors', majId)));
} else {
// 401: Unauthorized.
res.status(401).end();
}
});


// delete a shown major
app.delete('/user/:userid/majortoshow/:majorid', function(req, res) {
var fromUser = getUserIdFromToken(req.get('Authorization'));
// Convert params from string to number.
var majorId = parseInt(req.params.majorid, 10);
var userId = parseInt(req.params.userid, 10);
if (fromUser === userId) {
  var majItem = readDocument('users', userId);
  var courseIndex = majItem.shown_majors.indexOf(majorId);
  if(courseIndex !== -1){
    majItem.shown_majors.splice(courseIndex, 1);
    writeDocument('users', majItem);
  }

res.send(majItem.shown_majors.map((majId) =>
readDocument('majors', majId)));
} else {
// 401: Unauthorized.
res.status(401).end();
}
});

// delete a shown minor
app.delete('/user/:userid/minortoshow/:minorid', function(req, res) {
var fromUser = getUserIdFromToken(req.get('Authorization'));
// Convert params from string to number.
var minorId = parseInt(req.params.minorid, 10);
var userId = parseInt(req.params.userid, 10);
if (fromUser === userId) {
  var majItem = readDocument('users', userId);
  var courseIndex = majItem.shown_minors.indexOf(minorId);
  if(courseIndex !== -1){
    majItem.shown_minors.splice(courseIndex, 1);
    writeDocument('users', majItem);
  }
// Return a resolved version of the likeCounter
// Note that this request succeeds even if the
// user already unliked the request!
res.send(majItem.shown_minors.map((majId) =>
readDocument('majors', majId)));
} else {
// 401: Unauthorized.
res.status(401).end();
}
});



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


// Get savePage data
function getPageData(user){
  var userData = readDocument('users', user);
  var pageData = readDocument('savePage',userData.savedGraphs);
  return pageData;
}

app.get('/user/:userid/page',function(req,res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  var useridNumber = parseInt(userid,10);
  if(fromUser === useridNumber){
    res.send(getPageData(userid));
  }
  else {
    // 401: Unathorized request.
    res.status(401).end();
  }
});


app.delete('/user/:userid/page/:pageid', function(req,res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var pageId = parseInt(req.params.pageid, 10);
  var useridNumber = parseInt(req.params.userid,10);

  if (fromUser === useridNumber) {
    var userData = readDocument('users',useridNumber)
    var savePage = readDocument('savePage',userData.savedGraphs);
    if(pageId !== -1){
      savePage.pages.splice(pageId,1);
      writeDocument('savePage',savePage)
    }
    res.send(savePage)
  }
  else {
    // 401: Unauthorized.
    res.status(401).end();
  }

});

// Starts the server on port 3000!
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
