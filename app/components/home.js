import React from 'react';
import Sidebar from './sidebar';
import TextGraph from './text_graph';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3" id="side-bar">
            <Sidebar user={this.props.user}/>
            </div>
            <div className="col-md-9 main-app-canvas">
            <TextGraph />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
