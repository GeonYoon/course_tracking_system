import React from 'react';

import {getUserData} from '../server';

export default class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = { //THIS IS JUST A DUMMY VARIABLE, IT GETS OVERWRITTEN BY THE STATE
      "_id":"000000000000000000000001",
      "fullName": "WRONG",
      "classesTaken":["000000000000000000000001"],
      "sId":11111111,
      "savedGraphs":"000000000000000000000001",
      "majors":["000000000000000000000001"],
      "minors":["000000000000000000000001"],
      "gradDate":"WRONG",
      "email":"WRONG"
    }
  }

  refresh(){
    getUserData(this.props.user, (info) => {
      this.setState(info);
    });
  }

  componentDidMount(){
    this.refresh();
  }

  render(){
    return(
      <div className="container">
        <div className="row cntr">
          <div className="col-xs-3">
            <img className="pic" src="../img/profile1.jpeg" alt="profile image" />
          </div>
          <div className="col-xs-3 main-bdy">
            <span className="category">Full Name: </span>
            <p></p>
            <span className="category">University ID: </span>
            <p></p>
            <span className="category">Major(s): </span>
            <p></p>
            <span className="category">Minor(s): </span>
            <p></p>
            <span className="category">Grad Date: </span>
            <p></p>
            <span className="category">Email: </span>
            <p></p>
          </div>
          <div className="col-xs-5 main-bdy2">
            <span className="data">{this.state.fullName}</span>
            <p></p>
            <span className="data">{this.state.sId}</span>
            <p></p>
            <span className="data">
              {this.state.majors.map((majornum)=>{
                return(
                <span>{majornum.title}, </span>
                )
              })}
            </span>
            <p></p>
            <span className="data">
              {this.state.minors.map((majornum)=>{
                return(
                <span>{majornum.title}, </span>
                )
              })}
            </span>
            <p></p>
            <span className="data">{this.state.gradDate}</span>
            <p></p>
            <span className="data">{this.state.email}</span>
            <p></p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-5 shift">
          <p></p>
          </div>
          <div className="col-xs-2">
              <div className="input-group txtbx">
                <input type="text" id="old-pwrd" className="form-control" placeholder="Old Password" />
              </div>
              <br />
              <button type="button" id="pwrd-btn txtbx" className="btn btn-default">
                <span>Change Password</span>
                </button>
          </div>
          <div className="col-xs-3 shift2">
              <div className="input-group txtbx">
                <input type="text" id="new-pwrd-1" className="form-control" placeholder="New Password" />
              </div>
              <br />
              <div className="input-group txtbx">
                <input type="text" id="new-pwrd-2" className="form-control" placeholder="Confirm New Password" />
              </div>
        </div>
        </div>
      </div>
    )
  }
}
