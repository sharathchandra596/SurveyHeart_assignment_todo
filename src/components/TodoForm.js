import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addTodo, updateTodo, setEditingTodo } from '../redux/todoSlice';

function TodoForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const editingTodo = useSelector((state) => state.todos.editingTodo);

  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.todo);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editingTodo) {
        dispatch(updateTodo({ id: editingTodo.id, todo: input }));
        dispatch(setEditingTodo(null));
      } else {
        dispatch(addTodo(input));
      }
      setInput('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </Button>
    </Box>
  );
}

export default TodoForm;
