import React from 'react';
import {Link} from 'react-router';
import {getUserData,getMajorData,getMinorData,getPassword,setPassword,emulateServerReturn} from '../server';
export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {users: 1};
  }
  getData(user){
    getUserData(user, (info) => {
      this.setState(info);
    });
  }
  componentDidMount(){
    this.getData(this.state.users);
  }
  render(){
    var strMaj = "";
    var strMin = "";
    console.log(this.state.majors);

if(typeof this.state.majors != 'undefined'){
  console.log("loop");
    for(var count = 0; count<this.state.majors.length;count++){
      var x = getMajorData(this.state.majors[count]);
      if(count===this.state.majors.length-1){
        strMaj +=x.title;
      }else{
      strMaj+= (x.title + ", ");
      }
    }
    for(var ctr = 0; ctr<this.state.minors.length;ctr++){
      var y = getMinorData(this.state.minors[ctr]);
      if(ctr===this.state.minors.length-1){
        strMin +=y.title;
      }else{
        strMin+= (y.title + ", ");
      }
    }
}
console.log("Success?");
    // var e = document.getElementById('pwrd-btn');
    // e.onclick = function(){
    //   var pw1 = document.getElementById('old-pwrd').value;
    //   var pw2 = document.getElementById('new-pwrd-1').value;
    //   var pw3 = document.getElementById('new-pwrd-2').value;
    //   if(pw1!="" && pw2!="" && pw3!=""){
    //     if(pw1===getPassword(1) && pw2===pw3){
    //       setPassword(pw2);
    //     }
    //   }
    // }


    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <img className="pic" src="../img/profile1.jpeg" alt="profile image" />
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
          <div className="col-xs-4 main-bdy2">
            <span className="data">{this.state.fullName}</span>
            <p></p>
            <span className="data">{this.state.sId}</span>
            <p></p>
            <span className="data">{strMaj}</span>
            <p></p>
            <span className="data">{strMin}</span>
            <p></p>
            <span className="data">{this.state.gradDate}</span>
            <p></p>
            <span className="data">{this.state.email}</span>
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
                <input type="text" id="old-pwrd" className="form-control fb-search" placeholder="Old Password" />
              </div>
              <br />
              <div className="input-group">
                <input type="text" id="new-pwrd-1" className="form-control fb-search" placeholder="New Password" />
              </div>
              <br />
              <div className="input-group">
                <input type="text" id="new-pwrd-2" className="form-control fb-search" placeholder="Confirm New Password" />
              </div>
              <br />
          <button type="button" id="pwrd-btn" className="btn btn-default">
            <span>Change Password</span>
          </button>
        </div>
        </div>
      </div>
    )
  }
}
