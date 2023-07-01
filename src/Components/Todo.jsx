import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(()=>{
    const data = JSON.parse(localStorage.getItem('tos'))
    return (data || '')
  });
  const [editId, setEditID] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      console.log(todos);
      setTodo("");
    }
    if(editId){
      const editTodo = todos.find((tod)=>tod.id ==editId)  
      const updateTodo = todos.map((tod)=>tod.id === editTodo.id
      ? (tod = {id :tod.id,list : todo})
      : (tod = {id :tod.id,list :tod.list}))
      setTodos(updateTodo)
      setEditID(0)
      setTodo("")
    }
  };
  const inputRef = useRef("null");
  useEffect(()=>{
    localStorage.setItem('tos',JSON.stringify(todos))
  },[todos])

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter((tod) => tod.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((tod) => {
      if (tod.id === id) {
        return { ...tod, status: true };
      }
      return tod;
    });
    console.log(complete);
    setTodos(complete);
  };

  const onEdit = (id) => {
    const edittodo = todos.find((tod) => tod.id === id);
    setTodo(edittodo.list);
    setEditID(edittodo.id);
  };
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="forms-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your Todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((tod) => (
            <li className="list-items">
              <div
                className="list-item-list"
                id={tod.status ? "list-item" : ""}
              >
                {tod.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(tod.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(tod.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(tod.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Todo;
