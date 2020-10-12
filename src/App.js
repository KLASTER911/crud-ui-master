import React, { Component } from 'react';
import { createElement } from 'react';
import './App.css';
import Table from './Table/Table';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className = 'tableWindow'>
        {<Table/>}
        </div>
      </div>
    );
  }
}
export default App;
