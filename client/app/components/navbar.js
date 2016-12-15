import React from 'react';
import {Link} from 'react-router';
import {getUserData} from '../server.js'
export default class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fullName: ""
    }
  }

  componentDidMount(){
    getUserData(this.props.user, (info) => {
      this.setState(info);
    });
  }

  render(){

    return(
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="collapse navbar-collapse">
            <div className="nav navbar-nav navbar-left">
              <div className="btn-toolbar pull-left navbar-left" role="toolbar">
                <div className="btn-group" role="group">
                  <Link to={"/"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-home"></span> Home
                  </button>
                  </Link>
                  <Link to={"/savepage"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-folder-open"></span> Saved Maps
                  </button>
                  </Link>
                  <Link to={"/coursehistory"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-check"></span>Course History
                  </button>
                </Link>
                </div>
              </div>
            </div>
            <div className="nav navbar-nav navbar-right">
              <div className="btn-toolbar pull-right" role="toolbar">
                <div className="btn-group" role="group">
                <button className="btn btn-default navbar-btn reset-btn" type="button" onClick={() => {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', '/resetdb');
                  xhr.addEventListener('load', function() {
                    window.alert("Database reset! Refreshing the page now...");
                    document.location.reload(false);
                  });
                  xhr.send();
                }}>Reset Mock DB</button>
                <Link to={"/Profile/"}>
                  <button type="button" className="btn navbar-btn btn-default">
                    <span className="glyphicon glyphicon-user"></span> {this.state.fullName}
                  </button>
                  </Link>
                </div>
                <div className="btn-group" role="group">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn navbar-btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                  <li><Link to={"/About/"}>About</Link></li>
                  <li><a href="#">Log out...</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
  }
}
