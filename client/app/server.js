var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9';

export function getUserData(user, cb){
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getCourseData(course, cb){
  sendXHR('GET', '/courses/' + course,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPageData(user, cb){
  sendXHR('GET', '/user/' + user + '/page', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deletePageItem(user,pageid, cb){
   sendXHR('DELETE', '/user/' + user + '/page/' + pageid,
   undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
}

export function saveAGraph(user, graphTitle, newIMG, cb) {
  sendXHR('POST', '/savedgraph', {
    userId: user,
    graphName: graphTitle,
    contents: newIMG
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
  });
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

export function addCourse(user, course, cb){
  sendXHR('PUT', '/user/'+ user + '/courses/' + course,
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

export function removeCourse(user, course, cb){
  sendXHR('DELETE', '/user/'+ user + '/courses/' + course,
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postFeedback(user, content, cb){
  sendXHR('POST', '/feedback', {
    userId: user,
    contents: content
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
  }

  export function getFeedback(user, cb){
    sendXHR('GET', '/feedback/' + user, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
      });
      }

    // Return the new status update.
export function addCourseNextSemester(user, course, cb){
  sendXHR('PUT', '/user/'+ user + '/courses/' + course + '/nextsem/',
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


export function removeCourseNextSemester(user, course, cb){
  sendXHR('DELETE', '/user/'+ user + '/courses/' + course + '/nextsem/',
  undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function unixTimeToString(time) {
  return new Date(time).toLocaleString();
}

/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}

/**
* Properly configure+send an XMLHttpRequest with error handling,
* authorization token, and other needed properties.
*/
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that FaucetError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FaucetError */
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
      FaucetError('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    FaucetError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FaucetError('Could not ' + verb + " " + resource +
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
