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
    "1":{
      "user": new ObjectID("000000000000000000000001"),
      "contents": "first feedback"
    },
    "2":{
      "user": new ObjectID("000000000000000000000001"),
      "contents": "testing feedback"
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
      "description": "Continuity, limits, and the derivative for algebraic, trigonometric, logarithmic, exponential, and inverse functions. Applications to physics, chemistry, and engineering.",
      "department": "MATH",
      "number": 131,
      "prereqs": [],
      "textbooks": ["DERIVE THIS"]
    },
    "2":{
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Calculus II",
      "description": "The definite integral, techniques of integration, and applications to physics, chemistry, and engineering. Sequences, series, and power series. Taylor and MacLaurin series. Students expected to have and use a Texas Instruments 86 graphics, programmable calculator.",
      "department": "MATH",
      "number": 132,
      "prereqs": [new ObjectID("000000000000000000000001")],
      "textbooks": ["INTEGRATE THIS"]
    },
    "3":{
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Introduction to Problem Solving",
      "description": "COMPSCI 121 provides an introduction to problem solving and computer programming using the programming language Java; it also provides an integrated introduction to some of the wonderful innovations to modern science and indeed modern life that can be attributed to computer science. The course teaches how real-world problems can be solved computationally using the object-oriented metaphor that underlies Java. Concepts and techniques covered include data types, expressions, objects, methods, top-down program design, program testing and debugging, state representation, interactive programs, data abstraction, conditionals, iteration, interfaces, inheritance, arrays, graphics, and GUIs. No previous programming experience required. A companion introduction to programming class, COMPSCI 119 is also offered. If you are fairly sure you only want to do just one programming class, take that course; if you think it likely that you will do more than one programming course, take 121. Use of computer is required.",
      "department": "CS",
      "number": 121,
      "prereqs": [],
      "textbooks": ["Gordon 'G Money' Anderson: A tour of Umass CS"]
    },
    "4":{
      "_id": new ObjectID("000000000000000000000004"),
      "name": "Programming with Data Structures",
      "description": "This course introduces and develops methods for designing and implementing abstract data types using the Java programming language. The main focus is on how to build and encapsulate data objects and their associated operations. Specific topics include linked structures, recursive structures and algorithms, binary trees, balanced trees, and hash tables. These topics are fundamental to programming and are essential to other courses in computer science. There will be weekly assignments and assignments in discussion sections consisting of programming and written exercises. There will also be several exams. Prerequisites: COMPSCI 121 (or equivalent Java experience). Basic Math Skills (R1). Advising information about the prerequisite: for Fall 2016, students with grades of B-, C+, or C in 121 are strongly encouraged to take 190D,?Using Data Structures, in preparation for COMPSCI 187",
      "department": "CS",
      "number": 187,
      "prereqs": [new ObjectID("000000000000000000000003")],
      "textbooks": ["How do i linked list?"]
    },
    "5":{
      "_id": new ObjectID("000000000000000000000005"),
      "name": "Programming Methodology",
      "description": "Development of individual skills necessary for designing, implementing, testing and modifying larger programs, including: use of integrated design environments, design strategies and patterns, testing, working with large code bases and libraries, code refactoring, and use of debuggers and tools for version control. There will be significant programming and a mid-term and final examination.",
      "department": "CS",
      "number": 220,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Scala 4 Kidz"]
    },
    "6":{
      "_id": new ObjectID("000000000000000000000006"),
      "name": "Reasoning Under Uncertainty",
      "description": "Development of mathematical reasoning skills for problems that involve uncertainty. Each concept will be illustrated by real-world examples and demonstrated though in-class and homework exercises, some of which will involve programming. Counting and probability -- basic counting problems, probability definitions, mean, variance, binomial distribution, Markov and Chebyshev bounds. Probabilistic reasoning -- conditional probability and odds, Bayes' Law, Naive Bayes classifiers, Monte Carlo simulation. Markov chains, Markov decision processes, classical game theory, introduction to information theory.",
      "department": "CS",
      "number": 240,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Stats with Computers"]
    },
    "7":{
      "_id": new ObjectID("000000000000000000000007"),
      "name": "Computer Systems Principles",
      "description": "Large-scale software systems like Google - deployed over a world-wide network of hundreds of thousands of computers - have become a part of our lives. These are systems success stories - they are reliable, available (\"up\" nearly all the time), handle an unbelievable amount of load from users around the world, yet provide virtually instantaneous results. On the other hand, many computer systems don't perform nearly as well as Google - hence the now-cliché \"the system is down.\" In this class, we study the scientific principles behind the construction of high-performance, scalable systems. The course begins with a discussion of C language, and moves up the stack from there to the features of modern architectures, assembly languages, and operating system services such as I/O and synchronization.",
      "department": "CS",
      "number": 230,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["C Compilers"]
    },
    "8":{
      "_id": new ObjectID("000000000000000000000008"),
      "name": "Introduction to Computation",
      "description": "Lecture, discussion. Basic concepts of discrete mathematics useful to computer science: set theory, strings and formal languages, propositional and predicate calculus, relations and functions, basic number theory. Induction and recursion: interplay of inductive definition, inductive proof, and recursive algorithms. Graphs, trees, and search. Finite-state machines, regular languages, nondeterministic finite automata, Kleene's Theorem. Problem sets, 2-3 midterm exams, timed final.",
      "department": "CS",
      "number": 250,
      "prereqs": [new ObjectID("000000000000000000000004")],
      "textbooks": ["Computers are whack, yo"]
    },
    "9":{
      "_id": new ObjectID("000000000000000000000009"),
      "name": "Algorithms",
      "description": "This course will introduce you to algorithms in a variety of areas of interest, such as sorting, searching, string-processing, and graph algorithms. You will learn to study the performance of various algorithms within a formal, mathematical framework. You will also learn how to design very efficient algorithms for many kinds of problems. There will be one or more programming assignments as well to help you relate the empirical performance of an algorithm to theoretical predictions. Mathematical experience (as provided by COMPSCI 250) is required. You should also be able to program in Java, C, or some other closely related language.",
      "department": "CS",
      "number": 311,
      "prereqs": [new ObjectID("000000000000000000000008")],
      "textbooks": ["Algorithm Design"]
    },
    "10":{
      "_id": new ObjectID("000000000000000000000010"),
      "name": "CS Junior Year Writing",
      "description": "Using a range of different disciplinary perspectives we will explore various impacts of computers on modern society. This exploration will focus primarily on the social impacts of computers, with an emphasis on ethical concerns. Students will gain practice in several writing genres, including public writing and academic writing. Students will produce approximately 20-25 polished pages via 4-6 larger written projects. Writing experiences will also include writing for electronic environments, extensive practice with peer review, and discussion of job-seeking documents; there will be two presentations.",
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
      "description": "The World Wide Web was proposed originally as a collection of static documents inter-connected by hyperlinks. Today, the web has grown into a rich platform, built on a variety of protocols, standards, and programming languages, that aims to replace many of the services traditionally provided by a desktop operating system. Topics will include: producing dynamic content using a server-based language, content serving databases and XML documents, session state management, multi-tier web-based architectures, web security, and core technologies including HTTP, HTML5, CSS, JavaScript, and SQL will be emphasized. This course will also study concepts and technologies including AJAX, social networking, mashups, JavaScript libraries (e.g., jQuery), and web security. This course is hands-on and project-based; students will construct a substantial dynamic web application based on the concepts, technologies, and techniques presented during lecture. This course satisfies the IE Requirement.",
      "department": "CS",
      "number": 326,
      "prereqs": [new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000007")],
      "textbooks": ["Web Programming for Nerds"]
    },
    "13":{
      "_id": new ObjectID("000000000000000000000013"),
      "name": "Artificial Intelligence",
      "description": "The course explores key concepts underlying intelligent systems, which are increasingly deployed in consumer products and online services. Topics include problem solving, state-space representation, heuristic search techniques, game playing, knowledge representation, logical reasoning, automated planning, reasoning under uncertainty, decision theory and machine learning. We will examine how these concepts are applied in the context of several applications.",
      "department": "CS",
      "number": 383,
      "prereqs": [new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006")],
      "textbooks": ["none"]
    },
    "14":{
      "_id": new ObjectID("000000000000000000000014"),
      "name": "Software Engineering",
      "description": "In this course, students learn and gain practical experience with software engineering principles and techniques. The practical experience centers on a semester-long team project in which a software development project is carried through all the stages of the software life cycle. Topics in this course include requirements analysis, specification, design, abstraction, programming style, testing, maintenance, communication, teamwork, and software project management. Particular emphasis is placed on communication and negotiation skills and on designing and developing maintainable software. Use of computer required. Several written assignments, in-class presentations, exams, and a term project. This course satisfies the IE Requirement.",
      "department": "CS",
      "number": 320,
      "prereqs": [new ObjectID("000000000000000000000005")],
      "textbooks": ["none"]
    },
    "15":{
      "_id": new ObjectID("000000000000000000000015"),
      "name": "Operating Systems",
      "description": "In this course we examine the important problems in operating system design and implementation. The operating system provides a well-known, convenient, and efficient interface between user programs and the bare hardware of the computer on which they run. The operating system is responsible for allowing resources (e.g., disks, networks, and processors) to be shared, providing common services needed by many different programs (e.g., file service, the ability to start or stop processes, and access to the printer), and protecting individual programs from one another. The course will start with a brief historical perspective of the evolution of operating systems over the last fifty years, and then cover the major components of most operating systems. This discussion will cover the tradeoffs that can be made between performance and functionality during the design and implementation of an operating system. Particular emphasis will be given to three major OS subsystems: process management (processes, threads, CPU scheduling, synchronization, and deadlock), memory management (segmentation, paging, swapping), file systems, and operating system support for distributed systems.",
      "department": "CS",
      "number": 377,
      "prereqs": [new ObjectID("000000000000000000000007")],
      "textbooks": ["none"]
    },
    "16":{
      "_id": new ObjectID("000000000000000000000016"),
      "name": "Compiler Techniques",
      "description": "This course explores the basic problems in the translation of programming languages focusing on theory and common implementation techniques for compiling traditional block structured programming languages to produce assembly or object code for typical machines. The course involves a substantial laboratory project in which the student constructs a working compiler for a considerable subset of a realistic programming language, within a provided skeleton. The lectures are augmented by a discussion section that covers details of the programming language used to build the compiler, the operating system, the source language, and various tools. Use of computer required.",
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
"savePageItems":{
  "1": {
    "_id": new ObjectID("000000000000000000000001"),
    "name": "first draft",
    "time": 1479258637215,
    "image": "img/examplegraph.png"
  },
  "2": {
    "_id": new ObjectID("000000000000000000000002"),
    "name": "second draft",
    "time": 1479258638865,
    "image": "img/examplegraph1.png"
  },
  "3": {
    "_id": new ObjectID("000000000000000000000003"),
    "name": "third draft",
    "time": 1479258639666,
    "image": "img/main_mock_1.png"
  },
  "4": {
    "_id": new ObjectID("000000000000000000000004"),
    "name": "fourth draft",
    "time": 1479258640143,
    "image": "img/main_mock_1.png"
  },
  "5": {
    "_id": new ObjectID("000000000000000000000005"),
    "name": "fifth draft",
    "time": 1479258640645,
    "image": "img/main_mock_1.png"
  },
  "6":{
    "_id": new ObjectID("000000000000000000000006"),
    "name": "sixth draft",
    "time": 1479258641155,
    "image": "img/main_mock_1.png"
  }
},

"savePage": {
  "1": {
    "_id": new ObjectID("000000000000000000000001"),
    "pages": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006")]
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
