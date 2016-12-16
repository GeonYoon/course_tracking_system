// Implement your server in this file.
// We should be able to run your server with node src/server.js
var validate = require('express-jsonschema').validate;
var SavedGraphSchema = require('./schemas/savedgraph.json');
var FeedbackSchema = require('./schemas/feedback.json');
var bodyParser = require('body-parser');
var express = require('express');
var ResetDatabase = require('./resetdatabase');

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

  function resolveMajorObjects(majorList, callback) {
    if (majorList.length === 0) {
      callback(null, {});
    } else {
      var query = {
        $or: majorList.map((id) => { return {_id: id } })
      };
      db.collection('majors').find(query).toArray(function(err, majors) {
        if (err) {
          return callback(err);
        }
        var majorMap = {};
        majors.forEach((major) => {
          majorMap[major._id] = major;
        });
        callback(null, majorMap);
      });
    }
  }

  function resolveCourseObjects(courseList, callback) {
    if (courseList.length === 0) {
      callback(null, {});
    } else {
      var query = {
        $or: courseList.map((id) => { return {_id: id } })
      };
      db.collection('courses').find(query).toArray(function(err, courses) {
        if (err) {
          return callback(err);
        }
        var courseMap = {};
        courses.forEach((course) => {
          if(course.prereqs.length > 0){
            var newCourseList = [];
            newCourseList = newCourseList.concat(course.prereqs);
            resolveCourseObjects(newCourseList, function(err, courseMap2) {
              if (err) {
                return callback(err);
              }
              course.prereqs = course.prereqs.map((userId) => courseMap2[userId]);
            });
          }
          courseMap[course._id] = course;
        });
        callback(null, courseMap);
      });
    }
  }

  function getCourseItem(courseId, callback) {
    db.collection('courses').findOne({
      _id: new ObjectID(courseId)
    }, function(err, courseItem){
      if(err){
        return callback(err);
      } else if (courseItem === null) {
        return callback(null, null);
      }
      var courseList = [];
      courseList = courseList.concat(courseItem.prereqs);
      resolveCourseObjects(courseList, function(err, courseMap) {
        if (err) {
          return callback(err);
        }
        courseItem.prereqs = courseItem.prereqs.map((courseId) => courseMap[courseId]);
        callback(null, courseItem);
      });
    });
  }

  function getUserItem(userId, callback) {
    db.collection('users').findOne({
      _id: userId
    }, function(err, userItem) {
      if (err) {
        return callback(err);
      } else if (userItem === null) {
        return callback(null, null);
      }

      var majorList = [];

      majorList = majorList.concat(userItem.majors);
      majorList = majorList.concat(userItem.minors);
      majorList = majorList.concat(userItem.shown_majors);
      majorList = majorList.concat(userItem.shown_minors);

      resolveMajorObjects(majorList, function(err, majorMap) {
        if (err) {
          return callback(err);
        }

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
      });
    });
  }

  function getCourseData(course, callback) {``
    db.collection('courses').findOne({
      _id: new ObjectID(course)
    }, function(err, userData) {
      if (err) {
        return callback(err);
      } else if (userData === null) {
        // User not found.
        return callback(null, null);
      }
      getCourseItem(course, callback);
    });
  }

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

  function getAdmin(user,cb){
    db.collection('users').findOne(new ObjectID(user),function(err,result){
      if(err){
        return cb(err);
      }
      return cb(null,result);
    });

  }

  function getFeedback(cb){
    db.collection('feedback').find().toArray(function(err,result){
      if(err){
        return cb(err);
      }
      return cb(null,result);
    });
  }

  function postFeedback(user, contents, cb){
    var newFeedback = {
      "user": user,
      "contents": contents
    };
    db.collection('feedback').insertOne(newFeedback,function(err,result){
      if(err){
        return cb(err);
      }
      newFeedback._id = result.insertedId;
      return cb(null,result);
    });
  }

  function postSavedGraph(user, graphName, newIMG, callback) {
    // Get the current UNIX time.
    var time = new Date().getTime();
    // The new status update. The database will assign the ID for us.
    var newSaved = {
      "name": graphName,
      "time": time,
      "image": newIMG
    };
    db.collection('savePageItems').insertOne(newSaved, function(err, result) {
      if (err) {
        return callback(err);
      }
      newSaved._id = result.insertedId;

      db.collection('users').findOne({ _id: user }, function(err, userObject) {
        if (err) {
          return callback(err);
        }
        db.collection('savePage').updateOne({ _id: userObject.savedGraphs },
          {
            $push: {
              pages: {
                $each: [newSaved._id],
                $position: 0
              }
            }
          },
          function(err) {
            if (err) {
              return callback(err);
            }
            callback(null, newSaved);
          }
        );
      });
    });
  }

  function getPageItem(feedItemId, callback) {
    db.collection('savePageItems').findOne({
      _id: feedItemId
    }, function(err, feedItem) {
      if (err) {
        return callback(err);
      } else if (feedItem === null) {
        return callback(null, null);
      }
      callback(null, feedItem);
    });
  }
  // Get savePage data
  function getPageData(user,callback){
    db.collection('users').findOne({
      _id: new ObjectID(user)
    }, function(err, userData) {
      if(err) {
        return callback(err);
      } else if (userData === null) {
        return callback(null,null)
      }

      db.collection('savePage').findOne({
        _id: userData.savedGraphs
      }, function(err, pageData) {
        if(err) {
          return callback(err);
        } else if (pageData === null) {
          return callback(null,null);
        }
        var resolvedContents = [];
        function processNextPageItem(i) {
          getPageItem(pageData.pages[i], function(err, pageItem) {
            if (err) {
              callback(err);
            } else {
              resolvedContents.push(pageItem);
              if (resolvedContents.length === pageData.pages.length) {
                pageData.pages = resolvedContents;
                callback(null, pageData);
              } else {
                processNextPageItem(i + 1);
              }
            }
          });
        }

        if (pageData.pages.length === 0) {
          callback(null, pageData);
        } else {
          processNextPageItem(0);
        }
      });
    });
  }
  //send a database error
  function sendDatabaseError(res, err) {
  /*** Get the data for a course.
  */
  app.get('/courses/:course', function(req, res){
    getCourseData(req.params.course, function(err, courseData) {
      if (err) {

        res.status(500).send("Database error: " + err);
      } else if (courseData === null) {
        res.status(400).send("Could not look up course number " + req.params.course);
      } else {
        res.send(courseData);
      }
    });
  })
  /*** Get the data for a particular user.*/
  app.get('/user/:userid', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userid) {
      getUserData(new ObjectID(userid), function(err, feedData) {
        if (err) {
          res.status(500).send("Database error: " + err);
        } else if (feedData === null) {
          res.status(400).send("Could not look up feed for user " + userid);
        } else {
          res.send(feedData);
        }
      });
    } else {
      res.status(403).end();
    }
  });
  // get page data
  app.get('/user/:userid/page',function(req,res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser === userid){
      getPageData(userid,function(err,pageData) {
        if(err) {
          res.status(500).send("Database error: " + err);
        }
        else if (pageData === null) {
          res.status(400).send("Could not look up page");
        }
        else {
          res.send(pageData)
        }
      })
    }
    else {
      res.status(401).end();
    }
  });
  //get feedback for user
  app.get('/feedback/:userid', function(req,res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    getAdmin(fromUser,function(err,admin){
      if(admin){
        getFeedback(function(err,result){
          if(err){
            res.status(500).send("A database error occured: " + err);
          }else{
            res.status(201);
            console.log(result);
            res.send(result);
          }
        })
      } else {
        res.status(401).end();
      }})
    });

  //post feedback
  app.post('/feedback', validate({ body: FeedbackSchema }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.userId) {
      postFeedback(new ObjectID(fromUser), body.contents, function(err,result){
        if(err){
          res.status(500).send("A database error occured: " + err);
        }else{
          res.status(201);
          res.set('Location', '/feedback' + result._id);
          res.send(result);
        }
      });
    } else {
      res.status(401).end();
    }
  });

  //post a saved graph
  app.post('/savedgraph', validate({ body: SavedGraphSchema }), function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var body = req.body;

    if (fromUser === body.userId) {
      postSavedGraph(new ObjectID(fromUser), body.graphName, body.contents, function(err, newUpdate) {
      if (err) {
        res.status(500).send("A database error occurred: " + err);
      } else {
        res.status(201);
        res.send(newUpdate);
      }
    });
    }
    else {
      res.status(401).end();
    }

  });

  // Reset the database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
      res.send();
    });
  });

  // add shown major
  app.put('/user/:userid/majortoshow/:majorid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var majorId = req.params.majorid;
    var userId = new ObjectID(req.params.userid);
    if (fromUser === req.params.userid) {
      // First, we can update the like counter.
      db.collection('users').updateOne({ _id: userId },
        {
          // Add `userId` to the likeCounter if it is not already
          // in the array.
          $addToSet: {
            shown_majors: new ObjectID(majorId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Second, grab the feed item now that we have updated it.
          db.collection('users').findOne({ _id: userId }, function(err, userItem) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            // Return a resolved version of the likeCounter
            resolveMajorObjects(userItem.shown_majors, function(err, majorMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              // Return a resolved version of the likeCounter
              res.send(userItem.shown_majors.map((userId) => majorMap[userId]));
            });
          }
        );
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  // add shown minor
  app.put('/user/:userid/minortoshow/:minorid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var minorId = req.params.minorid;
    var userId = new ObjectID(req.params.userid);
    if (fromUser === req.params.userid) {
      // First, we can update the like counter.
      db.collection('users').updateOne({ _id: userId },
        {
          // Add `userId` to the likeCounter if it is not already
          // in the array.
          $addToSet: {
            shown_minors: new ObjectID(minorId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Second, grab the feed item now that we have updated it.
          db.collection('users').findOne({ _id: userId }, function(err, userItem) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            // Return a resolved version of the likeCounter
            resolveMajorObjects(userItem.shown_minors, function(err, majorMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              // Return a resolved version of the likeCounter
              res.send(userItem.shown_minors.map((userId) => majorMap[userId]));
            });
          }
        );
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  //add a course
  app.put('/user/:userid/courses/:courseid', function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    var courseId = new ObjectID(req.params.courseid);
    if (fromUser === userId){
      db.collection('users').updateOne({_id: new ObjectID(userId)},
      {
        $addToSet: {
          classesTaken: courseId
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('users').findOne({_id: new ObjectID(userId)}, function (err, userItem) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          resolveCourseObjects(userItem.classesTaken, function(err, coursemap) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(userItem.classesTaken.map((userId) => coursemap[userId]));
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  //add a course next semester
  app.put('/user/:userid/courses/:courseid/nextsem/', function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    var courseId = new ObjectID(req.params.courseid);
    if (fromUser === userId){
      db.collection('users').updateOne({_id: new ObjectID(userId)},
      {
        $addToSet: {
          nextSemester: courseId
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }

        db.collection('users').findOne({_id: new ObjectID(userId)}, function (err, userItem) {
          if (err) {
            return sendDatabaseError(res, err);
          }

          resolveCourseObjects(userItem.nextSemester, function(err, coursemap) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(userItem.nextSemester.map((userId) => coursemap[userId]));
          });

        });

      });
    } else {
      res.status(401).end();
    }
  });

  //delete shown major
  app.delete('/user/:userid/majortoshow/:majorid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var majorId = req.params.majorid;
    if (fromUser === req.params.userid) {
      db.collection('users').updateOne({ _id: userId },
        {
          $pull: {
            shown_majors: new ObjectID(majorId)
          }
        }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('users').findOne({ _id: userId }, function(err, feedItem) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          resolveMajorObjects(feedItem.shown_majors, function(err, userMap) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(feedItem.shown_majors.map((userId) => userMap[userId]));
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  //delete shown major
  app.delete('/user/:userid/minortoshow/:minorid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var minorId = req.params.minorid;
    if (fromUser === req.params.userid) {
      db.collection('users').updateOne({ _id: userId },
        {
          $pull: {
            shown_minors: new ObjectID(minorId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('users').findOne({ _id: userId }, function(err, feedItem) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            resolveMajorObjects(feedItem.shown_minors, function(err, userMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              res.send(feedItem.shown_minors.map((userId) => userMap[userId]));
            });
          });
        });
      } else {
        res.status(401).end();
      }
    });

    // //delete a course
    app.delete('/user/:userid/courses/:courseid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userId = new ObjectID(req.params.userid);
      var courseId = req.params.courseid;
      if (fromUser === req.params.userid) {
        db.collection('users').updateOne({ _id: userId },
          {
            $pull: {
              classesTaken: new ObjectID(courseId)
            }
          }, function(err) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            db.collection('users').findOne({ _id: userId }, function(err, feedItem) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              resolveCourseObjects(feedItem.classesTaken, function(err, userMap) {
                if (err) {
                  return sendDatabaseError(res, err);
                }
                res.send(feedItem.classesTaken.map((userId) => userMap[userId]));
              });
            });
          });
        } else {
          res.status(401).end();
        }
      });


      app.delete('/user/:userid/page/:pageid', function(req,res) {
        var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
        var feedItemId = new ObjectID(req.params.pageid);
        if (fromUser === req.params.userid) {
          db.collection('savePageItems').findOne({
            _id: feedItemId
          }, function(err, feedItem) {
            if (err) {
              return sendDatabaseError(res, err);
            } else if (feedItem === null) {
              return res.status(400).end();
            }
            db.collection('savePage').updateMany({}, {
              $pull: {
                pages: feedItemId
              }
            }, function(err) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              db.collection('savePageItems').deleteOne({
                _id: feedItemId
              }, function(err) {
                if (err) {
                  return sendDatabaseError(res, err);
                }
                res.send();
              });
            });
          });
        }else{
          res.status(401).end();
        }
      });

    //delete a course nextsemester
    //still needs a little work
    app.delete('/user/:userid/courses/:courseid/nextsem/', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userId = new ObjectID(req.params.userid);
      var courseId = req.params.courseid;
      if (fromUser === req.params.userid) {
        db.collection('users').updateOne({ _id: userId },
          {
            $pull: {
              nextSemester: new ObjectID(courseId)
            }
          }, function(err) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            db.collection('users').findOne({ _id: userId }, function(err, feedItem) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              resolveCourseObjects(feedItem.classesTaken, function(err, userMap) {
                if (err) {
                  return sendDatabaseError(res, err);
                }
                res.send(feedItem.classesTaken.map((userId) => userMap[userId]));
              });
            });
          });
        } else {
          res.status(401).end();
        }
      });

      //Delete page item
      app.delete('/user/:userid/page/:pageid', function(req,res) {
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var pageId = req.params.pageid;
        var useridNumber = new ObjectID(req.params.userid);

        if (fromUser === req.params.userid) {
          db.collection('users').findOne({_id : useridNumber}, function(err, userData) {
            if (err){
              res.status(500).send("Database error: " + err);
            }else {
              db.collection('savePage').updateOne(
                {_id : userData.savedGraphs}, {
                  $pull : { pages : {id : new ObjectID(pageId)} }
                }, function(err) {
                  if(err){
                    return sendDatabaseError(res, err);
                  }else{
                    getPageData(useridNumber,function(err,pageData) {
                      if(err) {
                        res.status(500).send("Database error: " + err);
                      }else if (pageData === null) {
                        res.status(400).send("Could not look up page");
                      }else {
                        res.send(pageData)
                      }
                    }
                  )
                }
              }
            )
          }
        });
      }else {
        res.status(401).end();
      }
    });

  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
// The file ends here. Nothing should be after this.
