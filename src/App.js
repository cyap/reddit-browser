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
      fetchingPosts: ''
    }
  }
  handleSearch = (searchTerm) => {
    this.setState({fetchingPosts:"Loading..."}, () => {
      request.get(`https://www.reddit.com/r/${searchTerm}.json`, 
        (err, res, body) => {
          console.log(err);
          console.log(res);
          console.log(body);
          this.setState({posts:jsonToPosts(body), fetchingPosts:""})}
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
        {this.state.fetchingPosts}
        <Newsfeed posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
