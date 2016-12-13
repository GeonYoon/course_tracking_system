var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "faucet";
// Put the initial mock objects here.
var initialData = {
  "users":{
    "1":{
      "_id":new ObjectID("000000000000000000000001"),
      "fullName": "Student One",
      "classesTaken":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000003")],
      "sId":12345678,
      "savedGraphs":new ObjectID("000000000000000000000001"),
      "majors":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003")],
      "minors":[new ObjectID("000000000000000000000002")],
      "gradDate":"May 2018",
      "email":"sone@umass.edu",
      "nextSemester":[new ObjectID("000000000000000000000002")],
      "shown_majors":[],
      "shown_minors":[],
      "admin": true,
      "password": "Pasword1"
    }
  },
  "feedback":{
    "0":{
      "length":2
    },
    "1":{
      "user": new ObjectID("000000000000000000000001"),
      "content": "first feedback"
    },
    "2":{
      "user": new ObjectID("000000000000000000000001"),
      "content": "testing feedback"
    }
},
  "majors":{
    "1":{
      "_id": new ObjectID("000000000000000000000001"),
      "title": "Computer Science",
      "courses":[new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007"),new ObjectID("000000000000000000000008"),new ObjectID("000000000000000000000009"),new ObjectID("000000000000000000000010"),new ObjectID("000000000000000000000012"),new ObjectID("000000000000000000000013"),new ObjectID("000000000000000000000014"),new ObjectID("000000000000000000000015"),new ObjectID("000000000000000000000016")]
    },
    "2":{
      "_id": new ObjectID("000000000000000000000002"),
      "title": "Math",
      "courses":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")]
    },
    "3":{
      "_id": new ObjectID("000000000000000000000003"),
      "title": "Philosophy",
      "courses":[new ObjectID("000000000000000000000011"),new ObjectID("000000000000000000000017"),new ObjectID("000000000000000000000018"),new ObjectID("000000000000000000000019")]
    }
  },
  "courses":{
    "1":{
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Calculus I",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 131,
      "prereqs": [],
      "textbooks": ["DERIVE THIS"]
    },
    "2":{
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Calculus II",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 132,
      "prereqs": [new ObjectID("000000000000000000000001")],
      "textbooks": ["INTEGRATE THIS"]
    },
    "3":{
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Introduction to Problem Solving",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 121,
      "prereqs": [],
      "textbooks": ["Gordon 'G Money' Anderson: A tour of Umass CS"]
    },
    "4":{
      "_id": new ObjectID("000000000000000000000004"),
      "name": "Programming with Data Structures",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 187,
      "prereqs": [new ObjectID("000000000000000000000003")],
      "textbooks": ["How do i linked list?"]
    },
    "5":{
      "_id": new ObjectID("000000000000000000000005"),
      "name": "Programming Methodology",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 220,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Scala 4 Kidz"]
    },
    "6":{
      "_id": new ObjectID("000000000000000000000006"),
      "name": "Reasoning Under Uncertainty",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 240,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Stats with Computers"]
    },
    "7":{
      "_id": new ObjectID("000000000000000000000007"),
      "name": "Computer Systems Principles",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 230,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["C Compilers"]
    },
    "8":{
      "_id": new ObjectID("000000000000000000000008"),
      "name": "Introduction to Computation",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 250,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Computers are whack, yo"]
    },
    "9":{
      "_id": new ObjectID("000000000000000000000009"),
      "name": "Algorithms",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 311,
      "prereqs": [new ObjectID("000000000000000000000008")],
      "textbooks": ["Algorithm Design"]
    },
    "10":{
      "_id": new ObjectID("000000000000000000000010"),
      "name": "CS Junior Year Writing",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 305,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "11":{
      "_id": new ObjectID("000000000000000000000011"),
      "name": "Medical Ethics",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 164,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "12":{
      "_id": new ObjectID("000000000000000000000012"),
      "name": "Web Programming",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 326,
      "prereqs": [new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000007")],
      "textbooks": ["Web Programming for Nerds"]
    },
    "13":{
      "_id": new ObjectID("000000000000000000000013"),
      "name": "Artificial Intelligence",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 383,
      "prereqs": [new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006")],
      "textbooks": ["none"]
    },
    "14":{
      "_id": new ObjectID("000000000000000000000014"),
      "name": "Software Engineering",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 320,
      "prereqs": [new ObjectID("000000000000000000000005")],
      "textbooks": ["none"]
    },
    "15":{
      "_id": new ObjectID("000000000000000000000015"),
      "name": "Operating Systems",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 377,
      "prereqs": [new ObjectID("000000000000000000000007")],
      "textbooks": ["none"]
    },
    "16":{
      "_id": new ObjectID("000000000000000000000016"),
      "name": "Compiler Techniques",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 410,
      "prereqs": [new ObjectID("000000000000000000000015"), new ObjectID("000000000000000000000008")],
      "textbooks": ["none"]
    },
    "17":{
      "_id": new ObjectID("000000000000000000000017"),
      "name": "Intro to Philosophy",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 100,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "18":{
      "_id": new ObjectID("000000000000000000000018"),
      "name": "Intermediate Logic",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 310,
      "prereqs": [new ObjectID("000000000000000000000017")],
      "textbooks": ["none"]
    },
    "19":{
      "_id": new ObjectID("000000000000000000000019"),
      "name": "Modal Logic",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 511,
      "prereqs": [new ObjectID("000000000000000000000018")],
      "textbooks": ["none"]
    }
},

"savePage": {
  "1": {
    "_id": new ObjectID("000000000000000000000001"),
    "pages": [
        {
          "id": new ObjectID("000000000000000000000000"),
          "name": "first draft",
          "time": 1479258637215,
          "image": "img/examplegraph.png"
        },
        {
          "id": new ObjectID("000000000000000000000001"),
          "name": "second draft",
          "time": 1479258638865,
          "image": "img/examplegraph1.png"
        },
        {
          "id": new ObjectID("000000000000000000000002"),
          "name": "third draft",
          "time": 1479258639666,
          "image": "img/main_mock_1.png"
        },
        {
          "id": new ObjectID("000000000000000000000003"),
          "name": "fourth draft",
          "time": 1479258640143,
          "image": "img/main_mock_1.png"
        },
        {
          "id": new ObjectID("000000000000000000000004"),
          "name": "fifth draft",
          "time": 1479258640645,
          "image": "img/main_mock_1.png"
        },
        {
          "id": new ObjectID("000000000000000000000005"),
          "name": "sixth draft",
          "time": 1479258641155,
          "image": "img/main_mock_1.png"
        }
      ]
  }
}

};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}

function addIndexes(db, cb) {
  db.collection('feedItems').createIndex({ "contents.contents": "text" }, null, cb);
}
