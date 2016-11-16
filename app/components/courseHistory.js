import React from 'react';
import {Link} from 'react-router';
import {getUserData, getCourseData} from '../server'

export default class CourseHistory extends React.Component {



  render() {

    var history = getUserData(1).classesTaken;
    var classes = history.map(course=>getCourseData(course));



    var rows = [];
    classes.map(course=>{
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
        <div className="col-md-12 main-app-settings">

          <div className="table-responsive">
            <table className="table table-bordered">
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
                    <div classNameName="dropdown pull-right">
                      <button classNameName="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select year: All
                      <span className="caret"></span></button>
                      <ul className="dropdown-menu">
                        <li><a href="#">All</a></li>
                        <li className="divider"></li>
                        <li><a href="#">2016</a></li>
                        <li><a href="#">2015</a></li>
                      </ul>
                    </div>
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
