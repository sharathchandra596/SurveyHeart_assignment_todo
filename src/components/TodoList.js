import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleComplete } from '../features/todos/todoSlice';
import { Button, TextField, Checkbox } from '@mui/material';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEdit = (id, title) => {
    setEditableTodoId(id);
    setNewTitle(title);
  };

  const handleSaveEdit = (id) => {
    dispatch(editTodo({ id, title: newTitle }));
    setEditableTodoId(null);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center space-x-4 p-2 border-b">
          <Checkbox
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
            color="primary"
          />
          {editableTodoId === todo.id ? (
            <TextField
              variant="outlined"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <span className={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
          )}
          {editableTodoId === todo.id ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveEdit(todo.id)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEdit(todo.id, todo.title)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
