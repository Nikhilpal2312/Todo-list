import React, { useState } from "react";
import "././App.css";
import {MdDelete} from 'react-icons/md';
import {BsCheckCircleFill} from 'react-icons/bs';
import { useEffect } from "react";

const App = () => {
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);
  const [allTodos, setAllTodos] = useState ([]);
  const[title, setTitle]=useState('');
  const[description, setDescription]=useState('');
  const [compltedTodos, setCompltedTodos] = useState([]);


  const handleAdd =() =>{
    var newTodos = {
      title:title,
      description:description,
    }
    var updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodos);
    setAllTodos(updateTodoArr);
    localStorage.setItem('todos', JSON.stringify(updateTodoArr));
    setTitle('');
    setDescription('')
  }

  useEffect(()=>{
    var saveTodos = JSON.parse(localStorage.getItem('todos'));
    var saveCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if(saveTodos){
      setAllTodos(saveTodos);
      
    }

    if(saveCompletedTodos) {
      setCompltedTodos(saveCompletedTodos);
    }
  },[])

 const handleToDoRemove = (index) =>{
  var deleteTodo = [...allTodos];
  deleteTodo.splice(index);
  localStorage.setItem('todos',JSON.stringify(deleteTodo));
  setAllTodos(deleteTodo)
 }

const handleRemoveCompletedTodos = (index) =>{
  var deleteTodo = [...compltedTodos];
  deleteTodo.splice(index);
  localStorage.setItem('completedTods',JSON.stringify(deleteTodo));
  setCompltedTodos(deleteTodo)
}


 const handleTodoComplete = (index) =>{
  var now = new Date();
  var dd = now.getDate();
  var mm = now.getMonth() + 1;
  var yyyy = now.getFullYear();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var CompleteOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

  var Filltered ={
    ...allTodos[index],
    CompleteOn:CompleteOn
  }
  var updateCompletedArr = [...compltedTodos];
  updateCompletedArr.push(Filltered)
  setCompltedTodos(updateCompletedArr);
  localStorage.setItem('compltedTodos', JSON.stringify(updateCompletedArr));
  handleToDoRemove (index)
 }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-2">My Todo</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="What is the Task Title"/>
              
            <label className="font-bold mb-3">Description</label>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="What is the Descripation" />
            </div>

        </div>
        
        <div className="primary-btn">
              <button type="button" onClick={handleAdd}> Add</button>
            </div>

        <div className="btn-area">
          <button
            type="button" className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            Todo
          </button>
          <button
            type="button"
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Complete
          </button>
        </div>
        <div className="todo-list">

       {isCompletedScreen === false && allTodos.map((item, index)=>{
        return(
          <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
      
            </div>
            <div className="flex gap-3">
            <BsCheckCircleFill
                title="Completed?"
                className=" check-icon"
                onClick={() => handleTodoComplete (index)}
              />
              <MdDelete
                title="Delete?"
                className="icon"
                onClick={() => handleToDoRemove (index)}
              />
              
            </div>
          </div>
        )
       })}

{isCompletedScreen === true && compltedTodos.map((item, index)=>{
        return(
          <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Complete on: {item.CompleteOn}</small></p>
      
            </div>
            <div className="flex gap-3">
              <MdDelete
                title="Delete?"
                className="icon"
                onClick={() => handleRemoveCompletedTodos (index)}
              />
              
            </div>
          </div>
        )
       })}

      </div>
      </div>
      </div>

  )
  }



export default App;
