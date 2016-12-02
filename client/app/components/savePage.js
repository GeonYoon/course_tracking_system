import React from 'react';
import SavePageItem from "./savePageItem";
import {getPageData,deletePageItem} from '../server';

export default class SavePages extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      temp: {
        pages : [
          {
            "name": "",
            "time": "",
            "image": ""
          }
        ]
      }
    };
  }

  componentDidMount() {
      this.refresh();
    }

  refresh() {
     getPageData(this.props.user, (pageData) => {
       this.setState({temp: pageData})
     });
  }

  deletePageItem(id) {
    deletePageItem(this.props.user,id,() => {
      this.refresh();
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)})
  }

  render() {
    let filteredDAta = this.state.temp.pages.filter(
      (page) => {
        return page.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    )
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 ">
            <div className="marginUpSide">
              <div className="sidebar">
                <div className="input-group">
                  <input type="text"
                      className="form-control"
                      placeholder="Search by Name"
                      value={this.state.search}
                      onChange={this.updateSearch.bind(this)}
                  />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-default">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="col-md-8 main-body">
            <div className="row bottom-space">{
                filteredDAta.map((page,i) => {
                  return (
                    <SavePageItem key ={i}
                                  onDelete={() => this.deletePageItem(i)}
                                  index = {i}
                                  name = {page.name}
                                  time = {page.time}
                                  picture = {page.image}>
                            {page.contents}
                    </SavePageItem>
                  );
                })
              }
          </div>
        </div>
      </div>
    </div>
    )
  }
}
