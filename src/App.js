import React, { Component } from 'react';
import request from 'request';

import './App.css';

import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Newsfeed from './components/Newsfeed'


class App extends Component {
  handleSearch(searchTerm) {
    request.get(`https://www.reddit.com/r/${searchTerm}.json`, 
      (err, res, body) => {
        console.log(body);
      }
    )
  }
  render() {
    return (
      <div className="App">
        <SearchBar 
          onSearch={this.handleSearch}
        />
        <Filters/>
        <Newsfeed/>
      </div>
    );
  }
}

export default App;
