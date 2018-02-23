import React, { Component } from 'react';
import request from 'request';

import './App.css';

import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Newsfeed from './components/Newsfeed';

import jsonToPosts from './utils/parse';

class App extends Component {
  handleSearch(searchTerm) {
    request.get(`https://www.reddit.com/r/${searchTerm}.json`, 
      (err, res, body) => {
        // Organize json
        // Update view / re-render newsfeed
        // Loading animation
        // Call to re-render newsfeed
        console.log(body);
        console.log(jsonToPosts(body));
        
      }
    )
  }


  render() {
    return (
      <div className="App">
        <SearchBar 
          onSearch={this.handleSearch}
        />
        <Filters
        />
        <Newsfeed/>
      </div>
    );
  }
}

export default App;
