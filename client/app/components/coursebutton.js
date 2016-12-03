import React from 'react';
import {getUserData, getCourseData, addCourse, removeCourse} from '../server.js';


export default class CourseButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "buttonText" : "Add Class"
    };
  }


  handleButton(e){
    e.preventDefault
    if(this.state.buttonText == "Add Class"){
      addCourse(this.props.user, this.props.course, res=>{this.refresh()
      console.log(res)
      })
    }else{
      removeCourse(this.props.user, this.props.course, res=>{this.refresh()
      console.log(res)
      })
    }

  }

  refresh(){
    getCourseData(this.props.course, course => {
        getUserData(this.props.user, user => {
          var buttonText = "Add Class";
          var courseIds = user.classesTaken.map(classes=>{return classes.id});

          course.prereqs.map(classes => {
            if(courseIds.indexOf(classes) == -1){
              buttonText = ""
            }
          })

          user.classesTaken.map(classes =>{
            if (classes.id == this.props.course){
              buttonText = "Remove Class";
            }
          })

          this.setState({
            "buttonText" : buttonText
          })
        })
      });
  }

  componentWillMount(){
    this.refresh();
  }

  componentDidMount(){
    this.refresh();
  }

  render(){
    if(this.state.buttonText != ""){
      return(
        <button onClick={(e) => this.handleButton(e)}>
          <span>
          {this.state.buttonText}
          </span>
        </button>
      )
    }else{
      return(false)
    }
  }

}
