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

  render(){
    return(
      <div className="row panel-body box-line">
        <button onClick={this.onClick.bind(this)} className="btn btn-default pull-left">{this.props.name}</button>
        <a className="pull-right">{unixTimeToString(this.props.time)}</a>
        <br />


        {this.state.showReply &&
          <img className="img-responsive" src={"img/" + this.props.picture}  width="100%" />
        }
      </div>
    )
  }
}
