import React from 'react';
import {addShownMinor} from '../server.js';
import {addShownMajor} from '../server.js';
import {saveAGraph} from '../server.js';
import {getUserData2} from '../server.js';


//IMPORTANT NOTES/TODO ABOUT THIS CLASS:
//in order to load from server correctly, the state in this class must be the current user
//we can load the student information from database the same way we do in main app,
//then have "shown majors" and "shown minors" arrays in the user info in database
//this way we can remember the majors for the user, load from server correctly, and hopefully then
//we can have the main app also load from "shown majors" and "shown minors" so that
//the sidebar and main graph interact better with each other.

//1. add the shown majors/minors arrays to the user objects in database
//2. write a server function to add to these arrays
//3. modify getUserDataSync so that it maps the numbers in the new arrays to the actual courses
//4. change this class to load from getUserData2 and set the state to that
//5. make it work as before with the new state
//6. in the main app, load from these new arrays
//7. check to see if main app re-renders when the sidebar's state is changed

//maybe "selected_major" and "selected_minor" can just be class variables?
//tbh not too sure how well that would work in javascript


//still to do:
//main app needs to be refreshed on changes
//main app needs to load minors (maybe in special way?)


var selmajnum = 0;
var selminnum = 0;


export default class Sidebar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      "_id":1,
      "fullName": "null student",
      "classesTaken":[],
      "sId":12345678,
      "savedGraphs":1,
      "majors":[1,2,3],
      "minors":[1,2,3],
      "gradDate":"May 2018",
      "email":"sone@umass.edu",
      "nextSemester":[],
      "shown_majors":[],
      "shown_minors":[]
    };
  }
  makePDF(){
    return "./file.pdf";
  }
  saveGraph(){
    saveAGraph(this.props.user);
  }
  addMajor(){
    var already_added = false;
      this.state.shown_majors.map((courses)=>{
        if(courses._id == selmajnum){
          already_added = true;
        }
      });
    if (!already_added  && !(selmajnum === 0)){
      addShownMajor(this.props.user, selmajnum, () => {
      this.refresh();
      });
      this.props.refr();
    }
  }
  updateSelectedMajor(event){
    selmajnum = event.target.value;
  }
  addMinor(){
    var already_added = false;
    this.state.shown_minors.map((courses)=>{
      if(courses._id == selminnum){
        already_added = true;
      }
    });
    if (!already_added  && !(selminnum === 0)){
      //can't just add selected minor, need to add the object
      addShownMinor(this.props.user, selminnum, () => {
      this.refresh();
      });
      this.props.refr();

    }
  }
  updateSelectedMinor(event){
    selminnum = event.target.value;
  }
  refresh(){
    getUserData2(this.props.user, (info)=>this.setState(info));
  }
  componentWillMount(){
    this.refresh();
  }
  render(){
    // var userInfo = getUserData(this.props.user);
    return(
      <div className="main-app-settings main-app-border">


          <p id="settings-title"> Graph Settings </p>

        <hr />

        <div className="form-group form-inline">
          <label>Add a Major:</label>
          <br />
          <select className="form-control side-major" title="Choose one of the following..." onChange={this.updateSelectedMajor.bind(this)}>
            <option value={0}>select a major..</option>
            {this.state.majors.map((majornum)=>{
                return(
                  <option value={majornum._id}>{majornum.title}</option>
                )
              })}
          </select>
            <button className="btn btn-default pull-right" type="button" onClick={this.addMajor.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>

        </div>
        <div className="form-group form-inline select-minor">
          <label>Add a Minor:</label>
          <br />
          <span><select className="form-control side-minor" onChange={this.updateSelectedMinor.bind(this)}>
            <option value={0}>select a minor..</option>
              {this.state.minors.map((majornum)=>{
                  return(
                    <option value={majornum._id}>{majornum.title}</option>
                  )
                })}
          </select></span>
            <button className="btn btn-default pull-right side-minor-btn" type="button" onClick={this.addMinor.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>
        </div>


      <hr />

      <div className="settings-current">
        Currently Showing: <br />
      {this.state.shown_majors.map((major)=>{
            return(
              <p>{major.title} Major</p>
            )
          })}
          {this.state.shown_minors.map((minor)=>{
                return(
                  <p>{minor.title} Minor</p>
                )
              })}
      </div>
      <hr />

      <div className="btn-group" role="group">

        <button type="button" className="btn navbar-btn btn-default">
          <span className="glyphicon glyphicon-floppy-disk" onClick={this.saveGraph.bind(this)}> Save Progress</span>
        </button>
        <br />
        <button type="button" className="btn navbar-btn btn-default">

          <a className="glyphicon glyphicon-save" href = {this.makePDF()} download="file.pdf"> Download PDF</a>
        </button>
        <br />
      </div>

      </div>
    )
  }
}
