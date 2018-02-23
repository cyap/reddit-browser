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
      subreddit: "",
      before: null,
      after: null,
      pageCount: 0
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
  handleSearch = (searchTerm, filter="", paramString="") => {
    this.setState({
        status:"Loading...",
        posts: [],
        subreddit: "",
        pageCount: paramString ? this.state.pageCount : 0
      }, () => {
      request.get(`https://www.reddit.com/r/${searchTerm}/${filter}.json?${paramString}`, 
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
                subreddit:searchTerm,
                before: data.data.before,
                after: data.data.after
              })
            }
          }
        }
      )
    })
  }
  handlePage = (key, value) => {
    let addCount;
    if (this.state.pageCount % 25 === 0) {
      if (key === "after") {
        addCount = 25;
      }
      else
        addCount = 1;
    }
    else {
      if (key === "after") {
        addCount = -1;
      }
      else {
        addCount = -25;
      }
    }
    this.setState({pageCount:this.state.pageCount + addCount}, () =>
      this.handleSearch(this.state.subreddit, "", `count=${this.state.pageCount}&${key}=${value}`)
    )
  }
  pagination = () => (
    <div>
      {this.state.before ? <button
        onClick={(e) => this.handlePage("before", this.state.before)}
        >Previous</button> : ""}
      {this.state.after ? <button
        onClick={(e) => this.handlePage("after", this.state.after)}
        >Next</button> : ""}
    </div>
  )
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
        {this.pagination()}
      </div>
    );
  }
}

export default App;
