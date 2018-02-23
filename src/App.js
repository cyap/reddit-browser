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
      posts: []
    }
  }
  handleSearch = (searchTerm) => {
    request.get(`https://www.reddit.com/r/${searchTerm}.json`, 
      (err, res, body) => {
        console.log(err);
        console.log(res);
        console.log(body);
        this.setState({posts:jsonToPosts(body)})}
    )
  }


  render() {
    return (
      <div className="App">
        <SearchBar 
          onSearch={this.handleSearch}
        />
        <Filters/>
        <Newsfeed posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
