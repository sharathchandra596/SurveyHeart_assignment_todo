import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTodo, toggleTodo, setEditingTodo } from '../redux/todoSlice';

function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id} secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => dispatch(setEditingTodo(todo))}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTodo(todo.id))}>
              <DeleteIcon />
            </IconButton>
          </>
        }>
          <Checkbox
            edge="start"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <ListItemText primary={todo.todo} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;