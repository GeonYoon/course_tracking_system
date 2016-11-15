import React from 'react';
import {Link} from 'react-router';
import {getUserData,getMajorData,getMinorData} from '../server';
export default class Profile extends React.Component{
  render(){
    var userInfo = getUserData(1);


    var strMaj = "";
    for(var count = 0; count<userInfo.majors.length;count++){
      var x = getMajorData(userInfo.majors[count]);
      if(count==userInfo.majors.length-1){
        strMaj +=x.title;
      }else{
      strMaj+= (x.title + ", ");
      }
    }
    var strMin = "";
    for(var ctr = 0; ctr<userInfo.minors.length;ctr++){
      var y = getMinorData(userInfo.minors[ctr]);
      if(ctr==userInfo.minors.length-1){
        strMin +=y.title;
      }else{
        strMin+= (y.title + ", ");
      }
    }
    // str+=(userInfo.majors[count] + " ");


    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <img className="pic" src="../img/profile.jpeg" alt="profile image" />
          </div>
          <div className="col-xs-2 main-bdy">
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
            <hr />
          </div>
          <div className="col-xs-3 main-bdy2">
            <span className="data">{userInfo.fullName}</span>
            <p></p>
            <span className="data">{userInfo.sId}</span>
            <p></p>
            <span className="data">{strMaj}</span>
            <p></p>
            <span className="data">{strMin}</span>
            <p></p>
            <span className="data">{userInfo.gradDate}</span>
            <p></p>
            <span className="data">{userInfo.email}</span>
            <p></p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <div className="row sidebar-box">
              <div className="sidebar">
              <Link to={"savepage"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span> Saved Graphs</span>
                  </button>
                  </Link>
                  <br />
                  <Link to={"coursehistory"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span> Course History</span>
                  </button>
                  </Link>
                  <br />
                  <Link to={"about"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span> About</span>
                  </button>
                  </Link>
                  <br />
                  <button type="button" className="btn navbar-btn btn-default">
                    <span> blank</span>
                  </button>
              </div>
            </div>
          </div>
          <div className="col-xs-5">
              <div className="input-group">
                <input type="text" className="form-control fb-search" placeholder="Old Password" />
              </div>
              <br />
              <div className="input-group">
                <input type="text" className="form-control fb-search" placeholder="New Password" />
              </div>
              <br />
              <div className="input-group">
                <input type="text" className="form-control fb-search" placeholder="Confirm New Password" />
              </div>
              <br />
          <button type="button" className="btn btn-default">
            <span>Change Password</span>
          </button>
        </div>
        </div>
      </div>
    )
  }
}
