import React from 'react';
import {addShownMinor} from '../server.js';
import {addShownMajor} from '../server.js';
import {saveAGraph} from '../server.js';
import {getUserData2} from '../server.js';
import {subtractShownMajor} from '../server.js';
import {subtractShownMinor} from '../server.js';



//to do:
//main app-stylize classes for minor
//main app-stylize classes you can take
//main app-load from server
//about page-load from server
//about page-send  feedback to server
//course details-tell user if they've taken all prereqs for a class
//course details-add a button to clear whether they're taking the class now/next semester
//user settings-let user add/subtract minors and majors
//figure out how to take picture of div
//connect EVERYTHING to real server
//add much more mock data

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
  subtractMajor(majNum){
    subtractShownMajor(this.props.user, majNum, () => {
    this.refresh();
    });
    this.props.refr();
  }
  subtractMinor(majNum){
    subtractShownMinor(this.props.user, majNum, () => {
    this.refresh();
    });
    this.props.refr();
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
      <br />
      {this.state.shown_majors.map((major)=>{
            return(
              <div>
              <p className="pull-left">{major.title} Major</p><button className="btn-xs btn-default pull-right" type="button" onClick={this.subtractMajor.bind(this, major._id)}><span className="glyphicon glyphicon-minus"></span></button>
              <br />
            </div>
          )
          })}
          {this.state.shown_minors.map((minor)=>{
                return(
                  <div>
                  <p className="pull-left">{minor.title} Minor</p><button className="btn-xs btn-default pull-right" type="button" onClick={this.subtractMinor.bind(this, minor._id)}><span className="glyphicon glyphicon-minus"></span></button>
                  <br />
                </div>
                )
              })}
              <br />
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
