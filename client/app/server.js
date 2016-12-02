var token = 'eyJpZCI6MX0=';
/**
* Properly configure+send an XMLHttpRequest with error handling,
* authorization token, and other needed properties.
*/
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      // FacebookError('Could not ' + verb + " " + resource + ": Received " +
      // statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    FacebookError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FacebookError('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
    // No body to send.
    xhr.send();
    break;
    case 'string':
    // Tell the server we are sending text.
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(body);
    break;
    case 'object':
    // Tell the server we are sending JSON.
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Convert body into a JSON string.
    xhr.send(JSON.stringify(body));
    break;
    default:
    throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function postFeedback(user, contents){
  var newFeedback = {
    "user": user,
    "contents": contents
  };
  newFeedback = addDocument('feedback', newFeedback);

  addDocument('feedback', newFeedback);

  //emulateServerReturn(newFeedback);
}

export function nextSem(user, courseId){
  var newNew = readDocument('users', user);
  newNew['nextSemester'].push(courseId);
  writeDocument('users', newNew)
}
export function haveTaken(user, courseId){
  var newNew1 = readDocument('users', user);
  newNew1['classesTaken'].push(courseId);
    writeDocument('users', newNew1)
}

// export function saveAGraph(user, newIMG){//will add more info like courses and stuff
//   var newSaved = {
//     "name": "default",
//     "time": (new Date).getTime(),
//     "image": newIMG
//   };
//   var newNew = readDocument('savePage', readDocument('users',user).savedGraphs);
//   newNew['pages'].push(newSaved);
//   writeDocument('savePage', newNew);
//   alert("Graph saved, check 'Save Pages' to view your saved graph!");
// }
/**
* Adds a new status update to the database.
*/
export function saveAGraph(user, newIMG, cb) {
sendXHR('POST', '/savedgraph', {
userId: 1,
contents: newIMG
}, (xhr) => {
// Return the new status update.
cb(JSON.parse(xhr.responseText));
});
}
export function unixTimeToString(time) {
  return new Date(time).toLocaleString();
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

function getCourseItemSync(courseId){
  var courseItem = readDocument('courses', courseId);
  courseItem.prereqs = courseItem.prereqs.map((id) => getCourseItemSync(id));
  return courseItem;
}

export function getCourseData(course, cb){
  sendXHR('GET', '/courses/' + course,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

function getMajorItemSync(majorId){
  var majorItem = readDocument('majors', majorId);
  majorItem.courses = majorItem.courses.map((id) => getCourseItemSync(id));
  return majorItem;
}

export function getMajorData2(major, cb){
  var majorData = getMajorItemSync(major)
  emulateServerReturn(majorData, cb)
}





export function addShownMajor(user, major, cb){
  sendXHR('PUT', '/user/' + user + '/majortoshow/' + major,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function addShownMinor(user, minor, cb){
  sendXHR('PUT', '/user/' + user + '/minortoshow/' + minor,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function subtractShownMajor(user, major, cb){
  sendXHR('DELETE', '/user/' + user + '/majortoshow/' + major,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
export function subtractShownMinor(user, minor, cb){
  sendXHR('DELETE', '/user/' + user + '/minortoshow/' + minor,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


// export function deleteFeedItem(feedItemId, cb) {
//   // Assumption: The current user authored this feed item.
//   deleteDocument('feedItems', feedItemId);
//   // Remove references to this feed item from all other feeds.
//   var feeds = getCollection('feeds');
//   var feedIds = Object.keys(feeds);
//   feedIds.forEach((feedId) => {
//     var feed = feeds[feedId];
//     var itemIdx = feed.contents.indexOf(feedItemId);
//     if (itemIdx !== -1) {
//       // Splice out of array.
//       feed.contents.splice(itemIdx, 1);
//       // Update feed.
//       writeDocument('feeds', feed);
//     }
//   });



/**
* Given a feed item ID, returns a FeedItem object with references resolved.
* Internal to the server, since it's synchronous.
*/
function getUserItemSync(userId) {
  var feedItem = readDocument('users', userId);
  // Resolve 'like' counter.
  // feedItem.savedGraphs =
  // feedItem.savedGraphs.map((id) => readDocument('savePage', id));
  //console.log('yo')
  feedItem.majors = feedItem.majors.map((id) => getMajorItemSync(id));
  feedItem.minors = feedItem.minors.map((id) => getMajorItemSync(id));
  feedItem.classesTaken = feedItem.classesTaken.map((id) => getCourseItemSync(id));
  feedItem.nextSemester = feedItem.nextSemester.map((id) => getCourseItemSync(id));
  feedItem.shown_minors = feedItem.shown_minors.map((id) => getMajorItemSync(id));
  feedItem.shown_majors = feedItem.shown_majors.map((id) => getMajorItemSync(id));

  // feedItem.majors = feedItem.majors.map((maj) =>{
  //   maj.courses.map((courseNum) =>{
  //     readDocument('')
  //   })
  // })
  // Assuming a StatusUpdate. If we had other types of
  // FeedItems in the DB, we would
  // need to check the type and have logic for each type.
  // Resolve comment author.
  return feedItem;
}


export function getUserData(user, cb){
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}



export function getCollectionData(collection_id){
  return readDocumentCollection(collection_id);
}
export function getMajorData(major){
  var majorData = readDocument('majors', major);
  return majorData;
}
export function getMinorData(minor){
  var minorData = readDocument('majors', minor); //for now, majors and minors taken from same list
  return minorData;
}
export function getFeedbackNum(fbnum){
  var feedbackdata = readDocument('feedback',fbnum);
  return feedbackdata;
}
export function getFeedbackData(){
  return readDocumentCollection('feedback');
}
// export function getPassword(accountNum){
//   return readDocumentCollection('accountData',accountNum);
// }
// export function setPassword(password){
//
//   return password;
// }

export function getPageData(user, cb){
  sendXHR('GET', '/user/' + user + '/page', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
