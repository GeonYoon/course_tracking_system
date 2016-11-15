import React from 'react';
import {Link} from 'react-router';

export default class CourseHistory extends React.Component {



  render() {
    var placeCols = [];
    placeCols.push(
      <td>
        <Link to={"/course/1"}>CS 326</Link>
      </td>
    );
    for (var i = 1; i < 9; i++) {
      placeCols.push(
        <td>
          Placeholder
        </td>
      );
    }
    var rows = [];
    for (var j = 9; j < 20; j++) {
      rows.push(
        <tr key={j}>
          {placeCols}
        </tr>
      );
    }
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
                    Description
                  </th>
                  <th>
                    Term
                  </th>
                  <th>
                    Units
                  </th>
                  <th>
                    Grade
                  </th>
                  <th>
                    Grade Points
                  </th>
                  <th>
                    Code
                  </th>
                  <th>
                    Degree Requirement
                  </th>
                  <th>
                    Status
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
