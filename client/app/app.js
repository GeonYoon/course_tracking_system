import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import {IndexRoute,Router, Route, browserHistory } from 'react-router';
import SavePages from './components/savePage';
import GraphHome from './components/hometwo';
import AboutPage from './components/about';
import ProfilePage from './components/profile';
import CourseHistoryPage from './components/courseHistory';
import CourseDetails from './components/coursedetails';
import HomePage from './components/home';
import {ResetDatabase} from './database.js';

class HomeTwo extends React.Component {
  render() {
    return (
      <GraphHome user={1}/>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <HomePage user={1}/>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <AboutPage user={1}/>
    );
  }
}

class SavePage extends React.Component {
  render() {
    return (
      <SavePages user={1}/>
    );
  }
}

class CourseHistory extends React.Component {
  render() {
    return (
      <CourseHistoryPage />
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <ProfilePage user={1}/>
    );
  }
}

class CourseDetailsFirst extends React.Component {
  render() {
    return (
      <CourseDetails />
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div><Navbar/>
      {this.props.children}
    </div>
    )
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeTwo} />
      <Route path="/home" component={HomeTwo} />
      <Route path="/about" component={About} />
      <Route path="/savepage" component={SavePage} />
      <Route path="/coursehistory" component={CourseHistory} />
      <Route path="/profile" component={Profile} />
      <Route path="/textgraph" component={Home} />
      <Route path = "/course/:course" component={CourseDetails} user={1}/>
    </Route>
  </Router>
),document.getElementById('app'));
