import React from 'react';
import {getUserData} from '../server.js';
import {getMajorData} from '../server.js';
import {getMinorData} from '../server.js';
import {saveAGraph} from '../server.js';



export default class Sidebar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {shown_majors: [], selcted_major: "select a major.."};
  }
  addMajor(event){
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
          <select className="form-control">
            <option>select a minor..</option>
              {userInfo.minors.map((majornum)=>{
                  return(
                    <option>{getMinorData(majornum).title}</option>
                  )
                })}
          </select>
            <button className="btn btn-default pull-right" type="button" ><span className="glyphicon glyphicon-plus"></span></button>
        </div>

        <div className="checkbox">
          <label><input type="checkbox" />Show Gen-ED Dependencies</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" value="" />Hide In-Elligible classNamees</label>
        </div>
      <hr />

      <div className="settings-current">
        Currently Showing: <br />
      {this.state.shown_majors.map((major)=>{
            return(
              <p>{major}</p>
            )
          })}
      </div>
      <hr />

      <div className="btn-group" role="group">

        <button type="button" className="btn navbar-btn btn-default">
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
