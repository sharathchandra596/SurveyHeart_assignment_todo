// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { fetchTodos } from './redux/todoSlice';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo App
        </Typography>
        <TodoForm />
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;