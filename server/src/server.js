// Implement your server in this file.
// We should be able to run your server with node src/server.js
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var getCollection = database.getCollection;
var validate = require('express-jsonschema').validate;
var SavedGraphSchema = require('./schemas/savedgraph.json');
var FeedbackSchema = require('./schemas/feedback.json');
var bodyParser = require('body-parser');
var express = require('express');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

// Creates an Express server.
var app = express();

app.use('/mongo_express', mongo_express(mongo_express_config));

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());

// Support receiving JSON in HTTP request bodies
// app.use(bodyParser.json());

app.use(express.static('../client/build'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/faucet';

MongoClient.connect(url, function(err, db) {


// function getUserData(user) {
//   var userData = getUserItemSync(user);
//   return userData;
// }

function getUserData(user, callback) {
  db.collection('users').findOne({
    _id: user
  }, function(err, userData) {
    if (err) {
      return callback(err);
    } else if (userData === null) {
      // User not found.
      return callback(null, null);
    }
    getUserItem(user, callback);


  });
}


/**
 * Resolves a list of major objects. Returns an object that maps major IDs to
 * major objects.
 */
function resolveMajorObjects(majorList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (majorList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: majorList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('majors').find(query).toArray(function(err, majors) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var majorMap = {};
      majors.forEach((major) => {

        var newMajorList = [];
        newMajorList = newMajorList.concat(major.courses);

        resolveCourseObjects(newMajorList, function(err, courseMap2) {
          if (err) {
            return callback(err);
          }
          major.courses = major.courses.map((userId) => courseMap2[userId]);
          callback(null, major);
        });

        majorMap[major._id] = major;
      });
      callback(null, majorMap);
    });
  }
}

//gotta add the calls to resolveCourse and resolveMajor in all of them. make the list, use the callback, all that.

/**
 * Resolves a list of course objects. Returns an object that maps course IDs to
 * course objects.
 */
function resolveCourseObjects(courseList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (courseList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: courseList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('courses').find(query).toArray(function(err, courses) {
      if (err) {
        return callback(err);
      }

      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var courseMap = {};
      courses.forEach((course) => {

          var newCourseList = [];
          newCourseList = newCourseList.concat(course.prereqs);

          resolveCourseObjects(newCourseList, function(err, courseMap2) {
            if (err) {
              return callback(err);
            }
            course.prereqs = course.prereqs.map((userId) => courseMap2[userId]);
            callback(null, course);
          });

        courseMap[course._id] = course;
      });
      callback(null, courseMap);
    });
  }
}

/**
 * Resolves a list of user objects. Returns an object that maps user IDs to
 * user objects.
 */
function resolveUserObjects(userList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (userList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: userList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('users').find(query).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }
}

// function getUserItemSync(userId) {
//   var user = readDocument('users', userId);
//   user.majors = user.majors.map((id) => getMajorItemSync(id));
//   user.minors = user.minors.map((id) => getMajorItemSync(id));
//   user.classesTaken = user.classesTaken.map((id) => getCourseItemSync(id));
//   user.nextSemester = user.nextSemester.map((id) => getCourseItemSync(id));
//   user.shown_minors = user.shown_minors.map((id) => getMajorItemSync(id));
//   user.shown_majors = user.shown_majors.map((id) => getMajorItemSync(id));
//   return user;
// }

function getUserItem(userId, callback) {
  // Get the user item with the given ID.
  db.collection('users').findOne({
    _id: userId
  }, function(err, userItem) {
    if (err) {
      // An error occurred.
      return callback(err);
    } else if (userItem === null) {
      // Feed item not found!
      return callback(null, null);
    }

    // Build a list of all of the user objects we need to resolve.
    // Start off with the author of the feedItem.
    var majorList = [];
    // Add all of the user IDs in the likeCounter.
    majorList = majorList.concat(userItem.majors);
    majorList = majorList.concat(userItem.minors);
    majorList = majorList.concat(userItem.shown_majors);
    majorList = majorList.concat(userItem.shown_minors);
    // Add all of the authors of the comments.
    // feedItem.comments.forEach((comment) => userList.push(comment.author));
    // Resolve all of the user objects!
    resolveMajorObjects(majorList, function(err, majorMap) {
      if (err) {
        return callback(err);
      }
      // Use the userMap to look up the author's user object
      // feedItem.contents.author = userMap[feedItem.contents.author];
      // Look up the user objects for all users in the like counter.
      userItem.majors = userItem.majors.map((userId) => majorMap[userId]);
      userItem.minors = userItem.minors.map((userId) => majorMap[userId]);
      userItem.shown_majors = userItem.shown_majors.map((userId) => majorMap[userId]);
      userItem.shown_minors = userItem.shown_minors.map((userId) => majorMap[userId]);

      var courseList = [];
      courseList = courseList.concat(userItem.classesTaken);
      courseList = courseList.concat(userItem.nextSemester);

      resolveCourseObjects(courseList, function(err,courseMap) {
        if (err) {
          return callback(err);
        }
        userItem.classesTaken = userItem.classesTaken.map((userId) => courseMap[userId]);
        userItem.nextSemester = userItem.nextSemester.map((userId) => courseMap[userId]);

        callback(null,userItem);
      });
      // Look up each comment's author's user object.
      // feedItem.comments.forEach((comment) => {
      //   comment.author = userMap[comment.author];
      // });
      // Return the resolved feedItem!
      callback(null, userItem);
    });
  });
}


function getCourseData(courseId){
  var courseItem = getCourseItemSync(courseId);
  return courseItem;
}
//
//
// function getCourseItemSync(courseId){
//   var courseItem = readDocument('courses', courseId);
//   courseItem.prereqs = courseItem.prereqs.map((id) => getCourseItemSync(id));
//   return courseItem;
// }
//
//
// function getMajorItemSync(majorId){
//   var majorItem = readDocument('majors', majorId);
//   majorItem.courses = majorItem.courses.map((id) => getCourseItemSync(id));
//   return majorItem;
// }


// Get savePage data
function getPageData(user){
  var userData = readDocument('users', user);
  var pageData = readDocument('savePage',userData.savedGraphs);
  return pageData;
}


function postFeedback(user, contents){
  var newFeedback = {
    "user": user,
    "contents": contents
  };
  var testDoc = addDocument('feedback', newFeedback);
  // console.log("feedback received!");
  return testDoc;
}

// function getFeedback(length){
//   console.log(length);
//   var tmp = [];
//   var i=1;
//   for(i;i<=length;i++){
//     tmp[i]=readDocument('feedback',i);
//   }
//   return tmp;
// }
function getAdmin(user){
var userData = readDocument('users', user);
// console.log("AYYYYYY" + userData.admin);
return userData.admin;
}

function getFeedback(){
  return getCollection('feedback');
}

function postSavedGraph(user, graphName, newIMG) {
  var newNew = readDocument('savePage',
                readDocument('users',user).savedGraphs)
  var newSaved = {
    "id": newNew['pages'].length,
    "name": graphName,
    "time": (new Date).getTime(),
    "image": newIMG
  };

  newNew['pages'].push(newSaved);
  writeDocument('savePage', newNew);
  // console.log("Should have saved graph to server");
  return newNew;
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
    if (typeof id === 'string') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return "";
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}


/**
* Get the data for a particular user.
*/
app.get('/user/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
      // Convert userid into an ObjectID before passing it to database queries.
      getUserData(new ObjectID(userid), function(err, feedData) {
        if (err) {
          // A database error happened.
          // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (feedData === null) {
          // Couldn't find the feed in the database.
          res.status(400).send("Could not look up feed for user " + userid);
        } else {
          // Send data.
          res.send(feedData);
        }
      });
    } else {
      // 403: Unauthorized request.
      res.status(403).end();
    }
});


/**
* Get the data for a course.
*/
app.get('/courses/:course', function(req, res){
    res.send(getCourseData(req.params.course));
})


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


app.post('/savedgraph', validate({ body: SavedGraphSchema }), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(body.userId, 10);
  // console.log(fromUser + " " +userId+ " "+body.userId);
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


// Reset database.
app.post('/resetdb', function(req, res) {
  // console.log("Resetting database...");
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

//add a course
app.put('/user/:userid/courses/:courseid', function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  var courseId = parseInt(req.params.courseid, 10);
  if (fromUser === userId) {
    var userItem = readDocument('users', userId);
    userItem.classesTaken.push(courseId);
    writeDocument('users', userItem);

    res.send(readDocument('users', userId));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

//add a course next semester
app.put('/user/:userid/courses/:courseid/nextsem/', function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  var courseId = parseInt(req.params.courseid, 10);
  if (fromUser === userId) {
    var userItem = readDocument('users', userId);
    userItem.nextSemester.push(courseId);
    writeDocument('users', userItem);

    res.send(readDocument('users', userId));
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
    res.send(majItem.shown_minors.map((majId) =>
      readDocument('majors', majId)));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

//delete a course
app.delete('/user/:userid/courses/:courseid', function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  var courseId = parseInt(req.params.courseid, 10);
  if (fromUser === userId) {
    var userItem = readDocument('users', userId);
    var courseIndex = userItem.classesTaken.indexOf(courseId);
    userItem.classesTaken.splice(courseIndex, 1);
    writeDocument('users', userItem);

    res.send(readDocument('users', userId));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

//delete a course nextsemester
app.delete('/user/:userid/courses/:courseid/nextsem/', function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  var courseId = parseInt(req.params.courseid, 10);
  if (fromUser === userId) {
    var userItem = readDocument('users', userId);
    var courseIndex = userItem.nextSemester.indexOf(courseId);
    userItem.nextSemester.splice(courseIndex, 1);
    writeDocument('users', userItem);

    res.send(readDocument('users', userId));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

  function search(array, ide) {
    for(var i = 0; i < array.length; i++){
      if(array[i].id === ide){
        return i
      }
    }
  }

//Delete page item
app.delete('/user/:userid/page/:pageid', function(req,res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var pageId = parseInt(req.params.pageid, 10);
  var useridNumber = parseInt(req.params.userid,10);

  if (fromUser === useridNumber) {
    var userData = readDocument('users',useridNumber)
    var savePage = readDocument('savePage',userData.savedGraphs);
    var pageArray = savePage.pages;

    if(pageId !== -1){
      savePage.pages.splice(search(pageArray,pageId),1);
      writeDocument('savePage',savePage)
    }
    res.send(savePage)
  }
  else {
    // 401: Unauthorized.
    res.status(401).end();
  }

});
//post feedback
app.post('/feedback', validate({ body: FeedbackSchema }), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(body.userId, 10);
  // console.log(fromUser + " " +userId+ " "+body.userId);
  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === userId) {
    var newFeedback = postFeedback(body.userId, body.contents);
    // console.log(newFeedback);
    // When POST creates a new resource, we should tell the client about it
    // in the 'Location' header and use status code 201.
    res.status(201);
    // Send the update!
    res.send(newFeedback);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

app.get('/feedback/', function(req,res) {
      res.send(getFeedback());
});

app.get('/feedback/:userid', function(req,res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid,10);
  if(fromUser === useridNumber){
      // console.log(fromUser + "   " + useridNumber + "    ");
    if(getAdmin(useridNumber)){
      res.send(getFeedback());
    }
  }
  else {
    // 401: Unathorized request.
    res.status(401).end();
  }
});

// Starts the server on port 3000!
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
});
// The file ends here. Nothing should be after this.
