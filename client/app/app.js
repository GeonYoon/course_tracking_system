import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import {IndexRoute,Router, Route, browserHistory } from 'react-router';
import SavePages from './components/savePage';
import HomePage from './components/home';
import AboutPage from './components/about';
import ProfilePage from './components/profile';
import CourseHistoryPage from './components/courseHistory';
import CourseDetails from './components/coursedetails';
import ErrorBanner from './components/errorbanner';

class Home extends React.Component {
  render() {
    return (
      <HomePage user={"000000000000000000000001"}/>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <AboutPage user={"000000000000000000000001"}/>
    );
  }
}

class SavePage extends React.Component {
  render() {
    return (
      <SavePages user={"000000000000000000000001"}/>
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
      <ProfilePage user={"000000000000000000000001"}/>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div><Navbar user={"000000000000000000000001"}/>
        <div className="row">
          <div className="col-md-12">
            <ErrorBanner />
          </div>
        </div>
      {this.props.children}
    </div>
    )
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/savepage" component={SavePage} />
      <Route path="/coursehistory" component={CourseHistory} />
      <Route path="/profile" component={Profile} />
      <Route path = "/course/:course" component={CourseDetails} user={"000000000000000000000001"}/>
    </Route>
  </Router>
),document.getElementById('app'));
