import React, { Component } from 'react';
import request from 'request';

import './App.css';

import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Newsfeed from './components/Newsfeed';

import jsonToPosts from './utils/parse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      status: "",
      subreddit: ""
    }
  }
  generateError = (subreddit, reason) => {
    this.setState({
      status: `Cannot access subreddit: ${subreddit}. Reason: ${reason}.`,
      posts: []
    })
  }
  generateFilters = () => this.state.subreddit ? <Filters onFilter={this.handleFilter} /> : ""
  handleFilter = (filter) => {
    this.handleSearch(this.state.subreddit, filter)
  }
  handleSearch = (searchTerm, filter="") => {
    this.setState({
        status:"Loading...",
        posts: [],
        subreddit: ""
      }, () => {
      request.get(`https://www.reddit.com/r/${searchTerm}/${filter}.json`, 
        (err, res, body) => {
          if (err) {
            this.generateError(searchTerm, "Invalid subreddit");
          }
          else {
            let data = JSON.parse(body);
            if (data.error) {
              this.generateError(searchTerm, data.message);
            }
            else {
              this.setState({
                status: "",
                posts: jsonToPosts(data),
                subreddit:searchTerm
              })
            }
          }
        }
      )
    })
  }
  render() {
    return (
      <div className="App">
        <SearchBar 
          onSearch={this.handleSearch}
        />
        {this.generateFilters()}
        <div className="infoMessage">
          {this.state.status}
        </div>
        <Newsfeed posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
