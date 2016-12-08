import React from 'react';
import {getCourseData, getUserData} from '../server'
import {Link} from 'react-router'
import CourseButton from './coursebutton'
import CourseButtonNextSemester from './nextsemesterbutton'




export default class CourseDetails extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "course" : {
        "id": "000000000000000000000001",
        "name": "Placeholder",
        "description": "Placeholder",
        "department": "Placeholder",
        "number": 1,
        "prereqs": [],
        "textbooks": ["Placeholder"]
      },
      "takenText" : "placeholder"
    }
  }


  componentDidMount(){
    this.refresh();
  }

  refresh(){
    getCourseData(this.props.params.course, course => {
        getUserData(this.props.route.user, user => {
          var takenText = "Eligible";

          var courseIds = user.classesTaken.map(classes=>{return classes.id});

          course.prereqs.map(classes => {
            if(courseIds.indexOf(classes.id) == -1){
              takenText = "Ineligible"
            }
          })

          user.classesTaken.map(classes =>{
            if (classes.id == this.props.params.course){
              takenText = "Taken";
            }
          })

          this.setState({
            "course" : course,
            "takenText" : takenText
          })
        })
      });
    }


  render(){

    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-10 col-md-offset-1">
            <div className = "panel">
              <div className = "panel-heading">
                <div className = "media">
                  <div className = "media-body">
                    <h1>
                      <strong>{this.state.course.department + " " + this.state.course.number}:</strong> {this.state.course.name}
                    </h1>
                    <h4>
                      <strong>Status: </strong>{this.state.takenText}
                       <CourseButton user = {this.props.route.user} course = {this.props.params.course} />
                       <CourseButtonNextSemester user = {this.props.route.user} course = {this.props.params.course} />
                    </h4>
                  </div>
                  <div className = "media-right media-middle">
                    <img className = "media-object" src = "img/CS326.png" alt="CS326" />
                  </div>
                </div>
              </div>
              <hr />
              <div className = "panel-body">
                <h3>Description</h3>
                <p>{this.state.course.description}</p>
                <h3>Textbooks</h3>
                <p>{this.state.course.textbooks}</p>
                <h3>Prerequisites</h3>
                {this.state.course.prereqs.map((clss) => {
                  console.log(clss.name);
                  return(<p>{clss.name}</p>)})}
                <hr />
                <div className = "col-md-3">
                  <h4>Similar classes...</h4>
                  <p>Here are some other classes you might be interested in taking.</p>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                </Link>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                  </Link>
                </div>
                <div className = "col-md-3 suggested">
                  <Link to={"/course/1"}>
                  <button type = "button" className = "btn btn-default">
                    <img className = "center-block" src = "img/CS326.png" alt="CS326" />
                    Web Programming
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
