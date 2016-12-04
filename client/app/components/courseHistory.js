import React from 'react';
import {Link} from 'react-router';
import {getUserData} from '../server'

export default class CourseHistory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "courses" : []
    }
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    getUserData(1, user =>{
      this.setState({
        "courses" : user.classesTaken
      })
    });
  }

  render() {
    var rows = [];

    this.state.courses.map(course=>{
      rows.push(
        <tr key = {course.id}>
          <td>
            <Link to={"/course/"+course.id}>{course.department + " " +course.number}</Link>
          </td>
          <td>
            {course.name}
          </td>
          <td>
            {course.description}
          </td>
        </tr>
      );
    })

    return (
      <div className="container">
        <div className="col-md-12 classTable">
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead className="thead">
                <tr>
                  <td colSpan="9">
                    <h2 id="tabletitle">Course History</h2>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="9">
                  </td>
                </tr>
                <tr>
                  <th>
                    Course
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Description
                  </th>
                </tr>
                 {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
