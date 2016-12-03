import React from 'react';
import {getUserData, getCourseData, addCourseNextSemester, removeCourseNextSemester} from '../server.js';


export default class CourseButtonNextSemester extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "buttonText" : "Add Class To Next Semester"
    };
  }


  handleButton(e){
    e.preventDefault
    if(this.state.buttonText == "Add Class To Next Semester"){
      addCourseNextSemester(this.props.user, this.props.course, res=>{this.refresh()
      console.log(res)
      })
    }else{
      removeCourseNextSemester(this.props.user, this.props.course, res=>{this.refresh()
      console.log(res)
      })
    }

  }

  refresh(){
    getCourseData(this.props.course, course => {
        getUserData(this.props.user, user => {
          var buttonText = "Add Class To Next Semester";
          var courseIds = user.classesTaken.map(classes=>{return classes.id});

          course.prereqs.map(classes => {
            if(courseIds.indexOf(classes.id) == -1){
              buttonText = ""
            }
          })

          user.nextSemester.map(classes =>{
            if (classes.id == this.props.course){
              buttonText = "Remove Class From Next Semester";
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
