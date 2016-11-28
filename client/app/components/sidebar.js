import React from 'react';
import {getUserData} from '../server.js';
import {getMajorData} from '../server.js';
import {getMinorData} from '../server.js';
import {saveAGraph} from '../server.js';
import {Link} from 'react-router';

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

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shown_majors: [],
                  shown_minors: [],
                  selected_major: "select a major..",
                  selected_minor: "select a minor.."
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
      if (this.state.shown_majors.indexOf(this.state.selected_major) > -1){
        already_added = true;
      }
    if (!already_added  && !(this.state.selected_major === "select a major..")){
      this.state.shown_majors.push(this.state.selected_major);
      this.setState({'shown_majors': this.state.shown_majors});
      console.log(this.state.selected_major);
    }
  }
  updateSelectedMajor(event){
    this.setState({'selected_major': event.target.value});
  }
  addMinor(){
    var already_added = false;
      if (this.state.shown_minors.indexOf(this.state.selected_minor) > -1){
        already_added = true;
      }
    if (!already_added  && !(this.state.selected_minor === "select a minor..")){
      this.state.shown_minors.push(this.state.selected_minor);
      this.setState({'selected_minors': this.state.shown_minors});
    }
  }
  updateSelectedMinor(event){
    this.setState({'selected_minor': event.target.value});
  }
  render(){
    var userInfo = getUserData(this.props.user);
    return(
      <div className="main-app-settings main-app-border">


          <p id="settings-title"> Graph Settings </p>

        <hr />

        <div className="form-group form-inline">
          <label>Add a Major:</label>
          <br />
          <select className="form-control side-major" title="Choose one of the following..." onChange={this.updateSelectedMajor.bind(this)}>
            <option>select a major..</option>
            {userInfo.majors.map((majornum)=>{
                return(
                  <option>{getMajorData(majornum).title}</option>
                )
              })}
          </select>
            <button className="btn btn-default pull-right" type="button" onClick={this.addMajor.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>

        </div>
        <div className="form-group form-inline select-minor">
          <label>Add a Minor:</label>
          <br />
          <span><select className="form-control side-minor" onChange={this.updateSelectedMinor.bind(this)}>
            <option>select a minor..</option>
              {userInfo.minors.map((majornum)=>{
                  return(
                    <option>{getMinorData(majornum).title}</option>
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
              <p>{major} Major</p>
            )
          })}
          {this.state.shown_minors.map((minor)=>{
                return(
                  <p>{minor} Minor</p>
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
