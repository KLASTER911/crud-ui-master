import React from 'react';
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
export default Table;