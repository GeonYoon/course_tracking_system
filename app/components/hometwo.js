import React from 'react';
import Sidebar from './sidebar';
import cytoscape from '../../build/js/cytoscape.js';
import {getMajorData} from '../server.js';
import {getUserData} from '../server.js';
import {getCourseData} from '../server.js';
import {Link} from 'react-router';
import {getUserData2} from '../server.js';

export default class GraphHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
}
 renderCytoscapeElement(){
   //console.log('* Cytoscape.js is rendering the graph..');

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
           'font-size': '24px',
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
       }
     ],
     layout: {
       name: 'circle',
       directed: true
     }
   });
   //this.refresh();
   this.userInfo = getUserData(this.props.user);
   this.userInfo.majors.map((maj)=>{
       getMajorData(maj).courses.map((course)=>{
         var taken = (this.userInfo.classesTaken.indexOf(course) > -1)
         var takentext = "notTaken"
         if(taken){
           takentext = "isTaken"
         }
         this.cy.add({
           data: {id: course, info: getCourseData(course).department + getCourseData(course).number, take: takentext}
         });
       })
        getMajorData(maj).courses.map((course)=>{
         getCourseData(course).prereqs.map((prereq)=>{
           this.cy.add({
             data: {id: prereq+''+course, source: prereq, target: course}
           });
         })
       }
     )
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
   this.cy.on('tap', 'node', function (evt) {
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
 refresh(){
   getUserData2(this.props.user, (info) => {
     this.setState(info);
   });
   this.userInfo = getUserData(this.props.user);
 }
 componentWillMount(){
   this.refresh();
 }
 componentDidMount(){
    this.renderCytoscapeElement();
}
  //  saveAsPNG(){
  //    this.cy.png();
  //  }

  render() {
    getUserData2(this.props.user, (info)=>this.setState(info))
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3" id="side-bar">
              <Sidebar user={this.props.user} cyto={this.cy}/>
            </div>
            <div className="col-md-9 main-app-canvas">
              <Link to={"/textgraph"}>
              <button type="button" className="btn btn-default">
                Go to text
              </button>
              </Link>
              <div className="cy1" id="cy"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
