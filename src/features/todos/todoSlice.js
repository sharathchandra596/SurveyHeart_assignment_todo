import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  }
});

export const { addTodo, deleteTodo, editTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
