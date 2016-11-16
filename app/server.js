import {readDocument, writeDocument, addDocument, readDocumentCollection} from './database.js';



export function postFeedback(user, contents){
  var newFeedback = {
    "user": user,
    "contents": contents
  };
  newFeedback = addDocument('feedback', newFeedback);

  writeDocument('feedback', newFeedback);

  //emulateServerReturn(newFeedback);
}

export function saveAGraph(user){//will add more info like courses and stuff
  var newSaved = {
    "name": "default",
    "time": (new Date).getTime(),
    "image":"main_mock_1.png"
  };
  console.log(readDocument('savePage', readDocument('users',user).savedGraphs)['pages']);
  var newNew = readDocument('savePage', readDocument('users',user).savedGraphs);
  newNew['pages'].push(newSaved);
  writeDocument('savePage', newNew);
  console.log(newNew._id);
  console.log(readDocument('savePage', readDocument('users',user).savedGraphs)['pages']);
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
  feedItem.majors = feedItem.majors.map((id) => readDocument('majors', id));
  feedItem.minors = feedItem.minors.map((id) => readDocument('majors', id));
  // Assuming a StatusUpdate. If we had other types of
  // FeedItems in the DB, we would
  // need to check the type and have logic for each type.
  // Resolve comment author.
  return feedItem;
}
/**
* Emulates a REST call to get the feed data for a particular user.
* @param user The ID of the user whose feed we are requesting.
* @param cb A Function object, which we will invoke when the Feed's data is available.
*/
export function getUserData(user) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  emulateServerReturn(userData, (info)=>{info});
  return userData;
  // Get the Feed object for the user.
  // Map the Feed's FeedItem references to actual FeedItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  // userData = userData.map(getUserItemSync);
  // Return FeedData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  // emulateServerReturn(userData, cb);
}
export function getUserData2(user, cb) {
  // Get the User object with the id "user".
  //var userData = readDocument('users', user);
  //return userData;
  // Get the Feed object for the user.
  // Map the Feed's FeedItem references to actual FeedItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  var userData = getUserItemSync(user);
  // Return FeedData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(userData, cb);
}
export function getCollectionData(collection_id){
  return readDocumentCollection(collection_id);
}
export function getMajorData(major){
  var majorData = readDocument('majors', major);
  return majorData;
}
export function getCourseData(major){
  var majorData = readDocument('courses', major);
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

export function getPageData(user){
  var userData = readDocument('users', user);
  var pageData = readDocument('savePage',userData.savedGraphs);
  return pageData;
}
