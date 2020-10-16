import React, { Component } from 'react';
import { createElement } from 'react';
class Table extends Component {
    state = {
    data: [], 
    isActive: [],
}

componentDidMount() {
  this.getData();
  console.log(this.state)
}
handleClik(item){
  let newIsActive = this.state.isActive;
  for (let i = 0; i<newIsActive.length;i++){
    if(newIsActive[i]._id === item._id){
      let id = newIsActive[i]._id;
      let namebut = newIsActive[i].namebut;
      let disabled = newIsActive[i].disabled;
      if(disabled===false){
        alert('Изменения сохранены');
        this.redactResponse(item._id);
      } //добавить сюда обновление в базе
      newIsActive.splice(i,1,{_id : id, disabled: !disabled, 
        namebut: !namebut});
        this.setState({isActive:newIsActive})
        //console.log(newIsActive)
    }
  }
  
    }
async getData(){
  const response = await fetch(`http://178.128.196.163:3000/api/records`);
  const data = await response.json();
//const xhr = new XMLHttpRequest();
//xhr.open('GET', 'http://178.128.196.163:3000/api/records');
//xhr.responseType = 'json';
//xhr.send();
//const data = xhr.response;
  let newIsActive  = [];
  for (let i = 0; i<data.length; i++){
    newIsActive.push({_id:data[i]._id,
                  disabled: true,
                  namebut: true});
  }
  this.setState({
    data,
    isActive:newIsActive,
  })
  console.log(this.state);
  //console.log(this.state.isActive);

}
buttVision(ID){
 for (let i = 0; i<this.state.isActive.length;i++){
    if(this.state.isActive[i]._id === ID){
        return this.state.isActive[i].namebut;
  }
 }
}
createLine(){
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://178.128.196.163:3000/api/records');
  xhr.responseType = 'json';
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({data:{Email:null,Login:null,Age:null}}));
  //xhr.send(JSON.stringify({data:{Email:'Boba',Login:'sdgsg',Age:252}}));
  this.getData();
  this.getData();
}
deltResponse(delID){
  let xhr = new XMLHttpRequest();
  let id = "5f889251ae66af078a51074d" //delID;
  xhr.open('DELETE', 'http://178.128.196.163:3000/api/records/'+id);
  xhr.responseType = 'json';
  let newdata = this.state.data;
  let newIsActive = this.state.isActive;
  xhr.onload = function(){
    if (xhr.status !== 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else{
      //alert(`Готово`);
     //status = true;
    }
  }
  xhr.send();
  if(xhr.status !== 200){
  for (let i = 0; i<newdata.length;i++){
    if(newdata[i]._id === id){
      newdata.splice(i,1);
      this.setState({data:newdata})
      //console.log(newdata)
      //console.log(this.state.data.length)
    }
  }
  for (let i = 0; i<newIsActive.length;i++){
    if(newIsActive[i]._id === id){
      newIsActive.splice(i,1);
      this.setState({isActive:newIsActive})}
  }
}
}
redactResponse(itemID){
  for (let i = 0; i<this.state.data.length;i++){
    if(this.state.data[i]._id === itemID){
      let Email = this.state.data[i].data.Email;
      let Login = this.state.data[i].data.Login;
      let Age = this.state.data[i].data.Age;
      console.log(itemID,Email,Login,Age);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://178.128.196.163:3000/api/records/'+itemID);
      xhr.responseType = 'json';
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({data:{Email:Email,Login:Login,Age:Age}}));
    }
  }
  
}
onTodoChange(value,itemID,data){
  let newdata = this.state.data;
  for (let i = 0; i<newdata.length;i++){
    if(this.state.data[i]._id === itemID){
      newdata[i].data[data] = value;
      console.log(data);
      console.log(newdata[i].data); // добавить редактирование state.data 
      //newdata[i].splice()
      this.setState({data:newdata});
    }
  }
  
}

  ///////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
    <div>
    <table className="table table-bordered">
        <thead className='thead-dark'>
            <tr>
                <th>e-mail</th>
                <th>login</th>
                <th>age</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { this.state.data.map(item =>(
                <tr key={item._id}>
                    <td><input value = {item.data.Email} onChange={e => this.onTodoChange(e.target.value,item._id,'Email')} placeholder= {item.data.Email} disabled = {this.buttVision(item._id) ? "disabled" : ""}/></td>
                    <td><input value = {item.data.Login} onChange={e => this.onTodoChange(e.target.value,item._id,'Login')} placeholder= {item.data.Login} disabled = {this.buttVision(item._id) ? "disabled" : ""}/></td>
                    <td><input value = {item.data.Age}   onChange={e => this.onTodoChange(e.target.value,item._id,'Age')}   placeholder= {item.data.Age} disabled = {this.buttVision(item._id) ? "disabled" : ""}/></td>
                    <td><button onClick = {()=>this.deltResponse(item._id)}>Delete</button></td>
                    <td><button onClick = {()=>this.handleClik(item)}>{this.buttVision(item._id) ? 'Редактировать': 'Сохранить'}</button></td>
                </tr>
            ))}
        </tbody>
    </table>    
      <button onClick = {()=>this.createLine()}>Создать строку</button>

      </div>
    
)}

}






export default Table;