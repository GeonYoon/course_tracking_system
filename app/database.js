import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = 'Faucet';

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users":{
    "1":{
      "_id":1,
      "fullName": "Student One",
      "sId":12345678,
      "savedGraphs":1,
      "majors":[1,3],
      "minors":[2],
      "gradDate":"May 2018",
      "email":"sone@umass.edu",
      "classesTaken":[1,2,4,5,6]
    }
  },
  "feedback":{
    "1":{
      "content": "first feedback"
    }
  },
  "majors":{
    "1":{
      "title": "Computer Science",
      "courses":[1,2,3,4,5,6,7,8,9,10,11]
    },
    "2":{
      "title": "Math",
      "courses":[3,4]
    },
    "3":{
      "title": "Philosophy",
      "courses":[]
    }
  },
  "courses":{
    "1":{
      "name": "Web Programming",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 326,
      "prereqs": [2],
      "textbooks": ["Web Programming for Nerds"]
    },
    "2":{
      "name": "Programming Methodology",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 220,
      "prereqs": [5],
      "textbooks": ["Scala 4 Kidz"]
    },
    "3":{
      "name": "Calculus II",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 132,
      "prereqs": [4],
      "textbooks": ["INTEGRATE THIS"]
    },
    "4":{
      "name": "Calculus I",
      "description": "THIS IS A DESCRIPTION",
      "department": "MATH",
      "number": 131,
      "prereqs": [],
      "textbooks": ["DERIVE THIS"]
    },
    "5":{
      "name": "Programming with Data Structures",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 187,
      "prereqs": [6],
      "textbooks": ["How do i linked list?"]
    },
    "6":{
      "name": "Introduction to Problem Solving",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 121,
      "prereqs": [],
      "textbooks": ["Gordon 'G Money' Anderson: A tour of Umass CS"]
    },
    "7":{
      "name": "Reasoning Under Uncertainty",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 240,
      "prereqs": [5],
      "textbooks": ["Stats with Computers"]
    },
    "8":{
      "name": "Computer Systems Principles",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 230,
      "prereqs": [5],
      "textbooks": ["C Compilers"]
    },
    "9":{
      "name": "Introduction to Computation",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 250,
      "prereqs": [5],
      "textbooks": ["Computers are whack, yo"]
    },
    "10":{
      "name": "Algorithms",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 311,
      "prereqs": [9],
      "textbooks": ["Algorithm Design"]
    },
    "11":{
      "name": "CS Junior Year Writing",
      "description": "THIS IS A DESCRIPTION",
      "department": "CS",
      "number": 305,
      "prereqs": [],
      "textbooks": ["none"]
    }
},

"savePage": {
  "1": {
    "pages": [
        {
          "name": "first draft",
          "time": "03:11pm . 09/15/2014",
          "image": "main_mock_1.png"
        },
        {
          "name": "second draft",
          "time": "03:11pm . 10/25/2015",
          "image": "main_mock_1.png"
        },
        {
          "name": "third draft",
          "time": "03:11pm . 09/15/2016",
          "image": "main_mock_1.png"
        },
        {
          "name": "fourth draft",
          "time": "03:11pm . 11/09/2016",
          "image": "main_mock_1.png"
        },
        {
          "name": "fifth draft",
          "time": "03:11pm . 09/20/2016",
          "image": "main_mock_1.png"
        },
        {
          "name": "sixth draft",
          "time": "03:11pm . 09/15/2014",
          "image": "main_mock_1.png"
        }
      ]
  }
}

};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readDocumentCollection(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */

class ResetDatabase extends React.Component {
 render() {
   return (
     <button className="btn btn-default" type="button" onClick={() => {
       resetDatabase();
       window.alert("Database reset! Refreshing the page now...");
       document.location.reload(false);
     }}>Reset Mock DB</button>
   );
 }
}

ReactDOM.render(
 <ResetDatabase />,
 document.getElementById('db-reset')
);
