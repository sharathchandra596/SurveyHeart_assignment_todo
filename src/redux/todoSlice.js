// src/redux/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://dummyjson.com/todos');
  return response.data.todos;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    editingTodo: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.unshift({  // Changed from push to unshift
        id: Date.now(),
        todo: action.payload,
        completed: false,
      });
      localStorage.setItem('todos', JSON.stringify(state.items));  // Save to localStorage
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        if (todo.completed && state.editingTodo && state.editingTodo.id === todo.id) {
          state.editingTodo = null;  // Clear editing state if the completed todo is being edited
        }
      }
      localStorage.setItem('todos', JSON.stringify(state.items));  // Save to localStorage
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));  // Save to localStorage
    },
    updateTodo: (state, action) => {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
      localStorage.setItem('todos', JSON.stringify(state.items));  // Save to localStorage
    },
    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload;
    },
    loadTodosFromLocalStorage: (state) => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        state.items = JSON.parse(storedTodos);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        localStorage.setItem('todos', JSON.stringify(state.items));  // Save to localStorage
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo, setEditingTodo, loadTodosFromLocalStorage } = todoSlice.actions;

export default todoSlice.reducer;