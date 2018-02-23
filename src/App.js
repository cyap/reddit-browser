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
    }
  }
  generateError = (subreddit, reason) => {
    this.setState({
      status: `Cannot access subreddit: ${subreddit}. Reason: ${reason}.`,
      posts: []
    })
  }
  handleSearch = (searchTerm) => {
    this.setState({status:"Loading..."}, () => {
      request.get(`https://www.reddit.com/r/${searchTerm}.json`, 
        (err, res, body) => {
          if (err) {
            this.generateError(searchTerm, "Invalid subreddit");
          }
          else {
            let data = JSON.parse(body);
            if (data.error) {
              this.generateError(searchTerm, data.reason);
            }
            else {
              this.setState({
                status: "",
                posts: jsonToPosts(data)
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
        <Filters/>
        {this.state.status}
        <Newsfeed posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
