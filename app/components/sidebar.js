import React from 'react';
import {getUserData} from '../server.js';
import {getMajorData} from '../server.js';
import {getMinorData} from '../server.js';
import {saveAGraph} from '../server.js';



export default class Sidebar extends React.Component{
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
          <select className="form-control" title="Choose one of the following...">
            <option>select a major..</option>
            {userInfo.majors.map((majornum)=>{
                return(
                  <option>{getMajorData(majornum).title}</option>
                )
              })}
          </select>
            <button className="btn btn-default pull-right" type="button" ><span className="glyphicon glyphicon-plus"></span></button>
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
        Computer Science Major
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
