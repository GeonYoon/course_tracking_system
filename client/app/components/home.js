import React from 'react';
import Sidebar from './sidebar';
import cytoscape from '../../build/js/cytoscape.js';
// import {Link} from 'react-router';
import {getUserData, getCourseData, saveAGraph} from '../server.js';

// var addedAlready = [];
// var preAlready = [];
export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "_id":"000000000000000000000001",
      "fullName": "Student One",
      "classesTaken":[],
      "sId":12345678,
      "savedGraphs":"000000000000000000000001",
      "majors":[],
      "minors":[],
      "gradDate":"May 2018",
      "email":"sone@umass.edu",
      "nextSemester":[],
      "shown_majors":[],
      "shown_minors":[]
    }
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
}
 renderCytoscapeElement(){
   //console.log('* Cytoscape.js is rendering the graph..');
   //this.refresh();
   this.cy = cytoscape({
     container: document.getElementById('cy'),
     elements: [],
     style: [
       {
         selector: 'node',
         style: {
           'label': 'data(info)',
           'width': '100px',
           'height': '100px',
           'font-size': '22px',
           'text-halign': 'center',
           'text-valign': 'center',
           'background-color': '#881c1c',
           'color': '#ccc'
         }
       }, {
         selector: 'edge',
         style: {
           'width': 4,
           'target-arrow-shape': 'triangle',
           'line-color': 'black',
           'target-arrow-color': 'black',
           'curve-style': 'bezier'
         }
       }, {
         selector: 'node[take = "notTaken"]',
         style: {
           'background-color': '#aaa'
         }
       }, {
         selector: 'node[take = "isTaken"]',
         style: {
           'background-color': '#881c1c'
         }
       }, {
         selector: 'node[take = "nextSemester"]',
         style: {
           'background-color': '#ADD8E6',
           'color': '#000000'
         }
       }, {
         selector: 'node[majmin = "maj"]',
         style: {
           'border-width': 4,
      'border-color': 'black'
         }
       }
     ],
     layout: {
       name: 'breadthfirst',
       directed: true
     }
   });
   //this.refresh();
   //this.userInfo = getUserData(this.props.user);
   //getUserData2(this.props.user, (info)=>this.setState(info))

   //this.userInfo = this.state;
// console.log(this.state);
   //ALL COURSES FROM THE MAJORS:
   this.state.shown_majors.map((maj)=>{
     maj.courses.map((crse)=>{
       getCourseData(crse, (course)=>{
        //  console.log(course);
         var taken = false;
          this.state.classesTaken.map((clss)=>{
            if(clss._id == course._id){
              taken = true;
            }
          });
         var nextTerm = false;
         this.state.nextSemester.map((clss)=>{
           if(clss._id == course._id){
             nextTerm = true;
           }
         });
         var takentext = "notTaken";
         if(taken){
          //  console.log(course);
           takentext = "isTaken";
         }
         if(nextTerm){
           takentext = "nextSemester";
         }
        //  if(addedAlready.indexOf(course._id) == -1 ){
             this.cy.add({
               data: {id: course._id, info: course.department + course.number, take: takentext, majmin: "maj"}
             });
             // console.log(data);
             course.prereqs.map((prereq)=>{
              //  if(preAlready.indexOf(prereq) == -1){
                 // getCourseData(prereq, prq=>{
                   this.cy.add({
                     data: {id: prereq._id+''+course._id, source: prereq._id, target: course._id}
                   });
                 // });
              //  preAlready.push(prereq)
            //  }
          });
          this.cy.layout({
            name: 'breadthfirst'
          });
        //  addedAlready.push(course._id);
      //  }
    });
  });
      //  console.log(this.state);
 });
   //small bug note:
   //overlapping classes across majors causes the prereq links to disappear
   //ALL COURSES FROM THE MINORS:
   this.state.shown_minors.map((maj)=>{
       maj.courses.map((crse)=>{
         getCourseData(crse, (course)=>{
         var taken = false;
          this.state.classesTaken.map((clss)=>{
            if(clss._id == course._id){
              taken = true;
            }
          });
         var nextTerm = false;
         this.state.nextSemester.map((clss)=>{
           if(clss._id == course._id){
             nextTerm = true;
           }
         });
         var takentext = "notTaken";
         if(taken){
          //  console.log(course);
           takentext = "isTaken";
         }
         if(nextTerm){
           takentext = "nextSemester";
         }

             this.cy.add({
               data: {id: course._id, info: course.department + course.number, take: takentext, majmin: "min"}
             });
            //  console.log(data);
             course.prereqs.map((prereq)=>{
              //  if(preAlready.indexOf(prereq) == -1){
                 // getCourseData(prereq, prq=>{
                   this.cy.add({
                     data: {id: prereq._id+''+course._id, source: prereq._id, target: course._id}
                   });
                   this.cy.layout({
                     name: 'breadthfirst'
                   });
                 // });
              //  preAlready.push(prereq)
            //  }
          });
           });
        });

  });




  //  this.cy.add({
  //    data: {id: 'z', info: 'testAdd'}
  //  });
  //  this.cy.add({
  //    data: {id: 'cz', source:'c', target:'z'}
  //  });
  //  this.cy.add({
  //    data: {id: 'zd', source:'z', target:'d'}
  //  });
  this.cy.layout({
    name: 'breadthfirst'
  });
   this.cy.on('tap', 'node', function () {
     //console.log(this.id())
     window.location.assign(("#/course/"+this.id()));
     //browserHistory.push('/course/'+this.id());//This is broken, not sure how to fix.
   });
   this.cy.on('mouseover', 'node', function(event) {
    var node = event.cyTarget;
    node.style({'width': '120px', 'height':'120px'});
});
this.cy.on('mouseout', 'node', function(event) {
 var node = event.cyTarget;
 node.style({'width': '100px', 'height':'100px'});
});
   //this.cy.png()
 }
 ref(){
    // console.log(this.state);

   getUserData(this.props.user, (info) => {
     this.setState(info);
   });
  //  console.log(this.state);
   //this.userInfo = getUserData(this.props.user);
  //  this.renderCytoscapeElement();
 }
 // componentWillReceiveProps(nextProps){
 //   getUserData2(this.props.user, (info) => {
 //     this.setState(info);
 //   });
 // }
 componentWillMount(){
   this.ref();
  // this.renderCytoscapeElement();
 }

 componentDidUpdate(){
    //this.refresh();
    this.renderCytoscapeElement();
}
// addMajor2(maj){
//   console.log(maj);
// }
   saveAsPNG(){
    //  var element = new Image();
    //  element.src = this.cy.png()
    //  console.log(this.cy.png());
    var graphName = "";
    graphName = prompt("Please enter a name for the graph", "");
    //  console.log(graphName);
    if(!(graphName == "" || graphName == null)){
     saveAGraph(this.props.user, graphName, this.cy.png(), ()=>{});
    }
    //  saveAGraph(this.props.user, this.cy.png());
     // once we get the server working for the png, we can save it right here
   }
    generatePNG(){
     var img = this.cy.png();
    //  console.log("generatePNG");
     return img;
   }

  render() {
    //getUserData2(this.props.user, (info)=>this.setState(info))
    //this.refresh();
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3" id="side-bar">
              <Sidebar genp={this.generatePNG.bind(this)} user={this.props.user} refr={this.ref.bind(this)} cyto={this.saveAsPNG.bind(this)} />
            </div>
            <div className="col-md-9 main-app-canvas">
              <div className="cy1" id="cy"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
