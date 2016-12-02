import React from 'react';
import {unixTimeToString} from '../server.js';

export default class SavePageItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showReply : false
    }
  }

  onClick(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }

  onDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }

  render(){
    return(
      <div className="row panel-body box-line">
        <button onClick={this.onClick.bind(this)} className="btn btn-default pull-left">{this.props.name}</button>
        <p className="pull-right">{unixTimeToString(this.props.time)}
          <button onClick={this.onDelete.bind(this)} className="btn btn-default pleft">delete</button>
        </p>
        <br />
        {this.state.showReply &&
          <img className="img-responsive" src={this.props.picture}  width="100%" />
        }
      </div>
    )
  }
}
