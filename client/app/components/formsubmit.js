import React from 'react';
import {postFeedback,getFeedback} from '../server';
// import {writeDocument, addDocument} from '../database.js';


export default class FormSub extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ""
    };
  }
  refresh(){
    this.setState({value: ""});
  }

  handlePost(e){
    e.preventDefault();
    var statusUpdateText = this.state.value.trim();
    if(statusUpdateText !== ""){
      postFeedback(this.props.user,statusUpdateText, info => {
        //  console.log(this.props.user + "," + statusUpdateText + ", " + info);
        this.refresh();
      });
    }else{
      this.refresh();
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render(){
    return(
      <div>
      <textarea rows="2"
                placeholder="Write any feedback you have and click 'submit'."
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
                className="form-control general-margin contact-form"/>

        <button type="button" className="btn btn-default general-margin"
          onClick={(e) => this.handlePost(e)}>
          Submit
        </button>
        {}
      </div>
    )
  }
}
