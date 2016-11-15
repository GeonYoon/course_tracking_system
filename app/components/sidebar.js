import React from 'react';
import {getUserData} from '../server.js';
import {getMajorData} from '../server.js';
import {getMinorData} from '../server.js';
import {saveAGraph} from '../server.js';



export default class Sidebar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shown_majors: [],
                  shown_minors: [],
                  selected_major: "select a major..",
                  selected_minor: "select a minor.."
    };
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

        <button type="button" className="btn navbar-btn btn-default pull-right">
          <span className="glyphicon glyphicon-arrow-left"> Settings Panel</span>
        </button>
        <br /><br />
        <hr />

        <div className="form-group form-inline">
          <label>Add a Major:</label>
          <br />
          <select className="form-control" title="Choose one of the following..." onChange={this.updateSelectedMajor.bind(this)}>
            <option>select a major..</option>
            {userInfo.majors.map((majornum)=>{
                return(
                  <option>{getMajorData(majornum).title}</option>
                )
              })}
          </select>
            <button className="btn btn-default pull-right" type="button" onClick={this.addMajor.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>
        </div>
        <div className="form-group form-inline">
          <label>Add a Minor:</label>
          <br />
          <select className="form-control" onChange={this.updateSelectedMinor.bind(this)}>
            <option>select a minor..</option>
              {userInfo.minors.map((majornum)=>{
                  return(
                    <option>{getMinorData(majornum).title}</option>
                  )
                })}
          </select>
            <button className="btn btn-default pull-right" type="button" onClick={this.addMinor.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>
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

        <button type="button" className="btn navbar-btn btn-default" onClick={this.saveGraph.bind(this)}>
          <span className="glyphicon glyphicon-floppy-disk"> Save Progress</span>
        </button>
        <br />
        <button type="button" className="btn navbar-btn btn-default">

          <a className="glyphicon glyphicon-save" href = "file.pdf" download> Download PDF</a>
        </button>
      </div>

      </div>
    )
  }
}
