import React from "react";
import "./App.css";
const App = () =>
{
  const [ todos, setTodos ] = React.useState([]);
  const [ todo, setTodo ] = React.useState("");

  const [ toEdit, settoEdit ] = React.useState(null);
  const [ editingText, setEditingText ] = React.useState("");

  // Add the handlesubmit code here
  function onSubmit(e)
  {
    e.preventDefault();

    const newTodo =
    {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    }

    if (newTodo.text.length > 1)
    {
      setTodos([ ...todos ].concat(newTodo));
      setTodo("");
    }
  }

  // Add the deleteToDo code here
  function onDelete(id)
  {
    let updatedTodo = [ ...todos ].filter((todo) =>
      todo.id !== id);
    setTodos(updatedTodo);
  }


  // Add the toggleComplete code here
  function onToggle(id)
  {
    let updatedTodo = [ ...todos ].map((todo) =>
    {
      if (todo.id === id)
      {
        todo.completed = !todo.completed;
      }
      return todo;
    });

  setTodos(updatedTodo);
  }

  // Add the submitEdits code here
  function submitEdit(id)
  {
    let updatedTodo = [ ...todos ].map((todo) =>
    {
      if (todo.id === id)
      {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodo);
    settoEdit(null);
  }

return(
<div className ="App">
<h1>Todo List</h1>
<form onSubmit={onSubmit}>
<input type="text"
        onChange={(e) => {setTodo(e.target.value) }} placeholder="Enter a task here"
        value ={todo}    />
      <button type="submit">Add Todo</button>
    </form>
    {todos.map((todo) =>
      <div key={todo.id}>
        <input type="checkbox" checked={todo.completed} onChange={() => { onToggle(todo.id) }}></input>
        {
          todo.id === toEdit ? <input type="text"
            onChange={(e) => { setEditingText(e.target.value) }}
            value={editingText} /> :
            <div>{todo.text}</div>
        }
        <button onClick={() => onDelete(todo.id)}>Delete</button>
        {
          todo.id === toEdit ? <button onClick={() => submitEdit(todo.id)}>Submit</button> :
          <button onClick={() => settoEdit(todo.id)}>Edit</button>
        }
      </div>
    )}
</div>
);
};
export default App;
