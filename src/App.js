import React, { Component } from 'react';
import { createElement } from 'react';
import './App.css';

import Table from './Table/Table';


class App extends Component {
    state ={
      data: [],}
  async componentDidMount() {
    const response = await fetch(`http://178.128.196.163:3000/api/records`);
    const data = await response.json();
    console.log(data);
    this.setState({
      data,
    })
  }
  createLine(){
    let id = null;
    let email = null;
    let login = null;
    let age = null;
    let v = null;
    let newdata = this.state.data;
    newdata.push({_id:id,
                data:{Email:email,
                      Login:login,
                      Age:age},
                __v:v});
    this.setState({data:newdata});
  }
  
  addLine(){

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://178.128.196.163:3000/api/records');
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({data:{Email:"Pupa",Login:"ttt11",Age:"1158"}}));
  }

  render() {
    return (
      <div className="App">
        <div className = 'tableWindow'>
        {<Table data={this.state.data}/>}
        </div>
      <div className = 'Buttons'>
      <button onClick = {()=>this.createLine()}>Сreate</button>
      <button onClick = {()=>this.addLine()}>addLine</button>
      </div>
      </div>
    );
  }
}
export default App;
