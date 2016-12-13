// Your startup's initial mock objects go here
var initialData = {
  "users":{
    "1":{
      "_id":1,
      "fullName": "Student One",
      "classesTaken":[1,2,4,5,6],
      "sId":12345678,
      "savedGraphs":1,
      "majors":[1,3],
      "minors":[2],
      "gradDate":"May 2018",
      "email":"sone@umass.edu",
      "nextSemester":[],
      "shown_majors":[],
      "shown_minors":[],
      "admin": true
    }
  },
  "accountData":{
    "username": "sone@umass.edu",
    "password": "Pasword1"
  },
  "feedback":{
    "1":{
      "user": 1,
      "contents": "first feedback"
    },
    "2":{
      "user": 1,
      "contents": "testing feedback"
    }
},
  "majors":{
    "1":{
      "_id": 1,
      "title": "Computer Science",
      "courses":[1,2,5,6,7,8,9,10,11,13,14,15,16]
    },
    "2":{
      "_id": 2,
      "title": "Math",
      "courses":[3,4]
    },
    "3":{
      "_id": 3,
      "title": "Philosophy",
      "courses":[12,17,18,19]
    }
  },
  "courses":{
    "1":{
      "id": 1,
      "name": "Web Programming",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 326,
      "prereqs": [2],
      "textbooks": ["Web Programming for Nerds"]
    },
    "2":{
      "id": 2,
      "name": "Programming Methodology",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 220,
      "prereqs": [5],
      "textbooks": ["Scala 4 Kidz"]
    },
    "3":{
      "id": 3,
      "name": "Calculus II",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 132,
      "prereqs": [4],
      "textbooks": ["INTEGRATE THIS"]
    },
    "4":{
      "id": 4,
      "name": "Calculus I",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 131,
      "prereqs": [],
      "textbooks": ["DERIVE THIS"]
    },
    "5":{
      "id": 5,
      "name": "Programming with Data Structures",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 187,
      "prereqs": [6],
      "textbooks": ["How do i linked list?"]
    },
    "6":{
      "id": 6,
      "name": "Introduction to Problem Solving",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 121,
      "prereqs": [],
      "textbooks": ["Gordon 'G Money' Anderson: A tour of Umass CS"]
    },
    "7":{
      "id": 7,
      "name": "Reasoning Under Uncertainty",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 240,
      "prereqs": [5],
      "textbooks": ["Stats with Computers"]
    },
    "8":{
      "id": 8,
      "name": "Computer Systems Principles",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 230,
      "prereqs": [5],
      "textbooks": ["C Compilers"]
    },
    "9":{
      "id": 9,
      "name": "Introduction to Computation",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 250,
      "prereqs": [5],
      "textbooks": ["Computers are whack, yo"]
    },
    "10":{
      "id": 10,
      "name": "Algorithms",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 311,
      "prereqs": [9],
      "textbooks": ["Algorithm Design"]
    },
    "11":{
      "id": 11,
      "name": "CS Junior Year Writing",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 305,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "12":{
      "id": 12,
      "name": "Medical Ethics",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 164,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "13":{
      "id": 13,
      "name": "Artificial Intelligence",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 383,
      "prereqs": [2,7],
      "textbooks": ["none"]
    },
    "14":{
      "id": 14,
      "name": "Software Engineering",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 320,
      "prereqs": [2],
      "textbooks": ["none"]
    },
    "15":{
      "id": 15,
      "name": "Operating Systems",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 377,
      "prereqs": [8],
      "textbooks": ["none"]
    },
    "16":{
      "id": 16,
      "name": "Compiler Techniques",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 410,
      "prereqs": [15, 9],
      "textbooks": ["none"]
    },
    "17":{
      "id": 17,
      "name": "Intro to Philosophy",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 100,
      "prereqs": [],
      "textbooks": ["none"]
    },
    "18":{
      "id": 18,
      "name": "Modal Logic",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 511,
      "prereqs": [19],
      "textbooks": ["none"]
    },
    "19":{
      "id": 19,
      "name": "Intermediate Logic",
      "description": "THIS IS A DESCRIPTION",
      "department": "PHIL",
      "number": 310,
      "prereqs": [17],
      "textbooks": ["none"]
    }
},

"savePage": {
  "1": {
    "_id": 1,
    "pages": [
        {
          "id": 0,
          "name": "first draft",
          "time": 1479258637215,
          "image": "img/examplegraph.png"
        },
        {
          "id": 1,
          "name": "second draft",
          "time": 1479258638865,
          "image": "img/examplegraph1.png"
        },
        {
          "id": 2,
          "name": "third draft",
          "time": 1479258639666,
          "image": "img/main_mock_1.png"
        },
        {
          "id": 3,
          "name": "fourth draft",
          "time": 1479258640143,
          "image": "img/main_mock_1.png"
        },
        {
          "id": 4,
          "name": "fifth draft",
          "time": 1479258640645,
          "image": "img/main_mock_1.png"
        },
        {
          "id": 5,
          "name": "sixth draft",
          "time": 1479258641155,
          "image": "img/main_mock_1.png"
        }
      ]
  }
}

};
var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
