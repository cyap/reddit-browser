import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Newsfeed from './components/Newsfeed'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar/>
        <Filters/>
        <Newsfeed/>
      </div>
    );
  }
}

export default App;
