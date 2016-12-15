import React from 'react';
import Sidebar from './sidebar';
import cytoscape from '../../build/js/cytoscape.js';
import {getUserData, getCourseData, saveAGraph} from '../server.js';


export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "_id":"000000000000000000000001",
      "fullName": "Placeholder",
      "classesTaken":[],
      "sId": 11111111,
      "savedGraphs":"000000000000000000000001",
      "majors":[],
      "minors":[],
      "gradDate":"Placeholder",
      "email":"Placeholder",
      "nextSemester":[],
      "shown_majors":[],
      "shown_minors":[]
    }
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
}

 renderCytoscapeElement(){
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
       },
       {
         selector: 'node.implies',
         style: {
          'border-color': '#01b700',
          'border-width': '5px'
          }
      },
      {
        selector: 'edge.implies',
        style: {
         'border-color': '#01b700',
         'border-width': '5px'
         }
     }
     ],
     layout: {
       name: 'breadthfirst',
       directed: true
     }
   });

   //ALL COURSES FROM THE MAJORS:
   this.state.shown_majors.map((maj)=>{
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
           takentext = "isTaken";
         }
         if(nextTerm){
           takentext = "nextSemester";
         }
         this.cy.add({
           data: {id: course._id, info: course.department + course.number, take: takentext, majmin: "maj"}});
           course.prereqs.map((prereq)=>{
             this.cy.add({
               data: {id: prereq._id+''+course._id, source: prereq._id, target: course._id}
             });
          });
          this.cy.layout({
            name: 'breadthfirst'
          });
        });
      });

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
           takentext = "isTaken";
         }
         if(nextTerm){
           takentext = "nextSemester";
         }

         this.cy.add({
           data: {id: course._id, info: course.department + course.number, take: takentext, majmin: "min"}
         });

         course.prereqs.map((prereq)=>{
           this.cy.add({
             data: {id: prereq._id+''+course._id, source: prereq._id, target: course._id}
           });

           this.cy.layout({
             name: 'breadthfirst'
           });
         });
       });
     });
   });

  this.cy.layout({
    name: 'breadthfirst'
  });

  this.cy.on('tap', 'node', function () {
    window.location.assign(("#/course/"+this.id()));
  });

  this.cy.on('mouseover', 'node', function(event) {
    var node = event.cyTarget;
    node.style({'width': '120px', 'height':'120px'});
    node.outgoers().addClass('implies')
  });

  this.cy.on('mouseout', 'node', function(event) {
    var node = event.cyTarget;
    node.style({'width': '100px', 'height':'100px'});
    node.outgoers().removeClass('implies')
  });
}

ref(){
  getUserData(this.props.user, (info) => {
    this.setState(info);
  });
}

 componentWillMount(){
   this.ref();
 }

 componentDidUpdate(){
    this.renderCytoscapeElement()
  }

  saveAsPNG(){
    var graphName = "";
    graphName = prompt("Please enter a name for the graph", "");
    if(!(graphName == "" || graphName == null)){
      saveAGraph(this.props.user, graphName, this.cy.png(), ()=>{});
    }
    //  saveAGraph(this.props.user, this.cy.png());
     // once we get the server working for the png, we can save it right here
   }

  generatePNG(){
    var img = this.cy.png();
    return img;
  }

  render() {
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
