import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import { Button, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ id: uuidv4(), title, completed: false }));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-4">
      <TextField
        label="New Task"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
};

export default AddTodo;
