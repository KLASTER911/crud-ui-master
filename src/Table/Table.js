import React, { Component } from 'react';
import { createElement } from 'react';
class Table extends Component {
    state ={
    data: [],}

componentDidMount() {
  this.getData();
}
async getData(){
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
  newdata.push({
              data:{Email:email,
                    Login:login,
                    Age:age},
              });
  this.setState({data:newdata});
}
addLine(){
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://178.128.196.163:3000/api/records');
  xhr.responseType = 'json';
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({data:{Email:"Buba",Login:"123",Age:"13"}}));
  //this.createLine()
}
checkStatus(xhr){
  if (this.xhr.status !== 200) {
      alert(`Ошибка ${this.xhr.status}: ${this.xhr.statusText}`);
    } else {
      this.createLine();
    }
}
deltResponse(delID){
  let xhr = new XMLHttpRequest();
  let id = delID;
  xhr.open('DELETE', 'http://178.128.196.163:3000/api/records/'+id);
  xhr.responseType = 'json';
  
  xhr.send();
  xhr.onload = this.checkStatus(this.xhr);
  };

redactResponse(item){
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
    }
  };
  render() {
    return (
    <div>
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
            { this.state.data.map(item =>(
                <tr key={item._id}>
                    <td>{item._id}</td>
                    <td><input value ={item.data.Email} onchange="alert(this.value)"></input></td>
                    <td><input value ={item.data.Login}></input></td>
                    <td><input value ={item.data.Age}></input></td>
                    <td><input value ={item.__v}></input></td>
                    <td><button onClick = {()=>this.deltResponse(item._id)}>Delete</button></td>
                    <td><button onClick = {()=>this.redactResponse(item)}>Редактировать</button></td>
                </tr>
            ))}
        </tbody>
    </table>    
      <button onClick = {()=>this.createLine()}>Сreate</button>
      <button onClick = {()=>this.addLine()}>addLine</button>
      </div>
    
)}

}






export default Table;