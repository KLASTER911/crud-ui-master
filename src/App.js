import React, { Component } from 'react';
import { createElement } from 'react';
import './App.css';

//import Table from './Table/Table';


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
function Table(props){

  return (
      <table className="table table-bordered">
          <thead className='thead-dark'>
              <tr>
                  <th>ID</th>
                  <th>e-mail</th>
                  <th>login</th>
                  <th>age</th>
                  <th>v</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              { props.data.map(item =>(
                  <tr key={item._id}>
                      <td>{item._id}</td>
                      <td><input value ={item.data.Email} onchange="alert(this.value)"></input></td>
                      <td><input value ={item.data.Login}></input></td>
                      <td><input value ={item.data.Age}></input></td>
                      <td><input value ={item.__v}></input></td>
                      <td><button onClick = {()=>deltResponse(item._id)}>Delete</button></td>
                      <td><button onClick = {()=>redactResponse(item)}>Редактировать</button></td>
                  </tr>
              ))}
          </tbody>
      </table>
  )
  }
  
  function deltResponse(delID){
      let xhr = new XMLHttpRequest();
      let id = delID;
      xhr.open('DELETE', 'http://178.128.196.163:3000/api/records/'+id);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function() {
          if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            alert(`Готово`);
          }
        };
  }
  function redactResponse(item){
      let xhr = new XMLHttpRequest();
      let id = item._id;
      xhr.open('POST', 'http://178.128.196.163:3000/api/records/'+id);
      xhr.responseType = 'json';
      xhr.send(JSON.stringify({data:{Email:item.Email,Login:item.Login,Age:item.Age}}));
      xhr.onload = function() {
          if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            alert(`Готово`);
          }
        };
  }
export default App;
