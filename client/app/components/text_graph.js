import React from 'react';
import {getCollectionData} from '../server.js';

export default class TextGraph extends React.Component {

  render() {
    var courses = getCollectionData('courses');


    var nodes = [];
    for (var k1 in courses){
      var node = "\tCourse "+ k1 + " - " + courses[k1]['department'] + courses[k1]['number']+" "+courses[k1]['name'];
          nodes.push(<p>{node}</p>);
    }
    var edges = [];
    for (var k2 in courses){
        for (var p in courses[k2]['prereqs']){
          var edge = "\tCourse "+ courses[k2]['prereqs'][p] + " --> "+k2;
          edges.push(<p>{edge}</p>);
        }
    }
    
    return (
      <div>
        <p>NODES:</p>
        {nodes}
        <p>EDGES:</p>
        {edges}
      </div>
    );
  }
}
