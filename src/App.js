import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FetchData from './pages/FetchData';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-lg mx-auto p-6">
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
              <AddTodo />
              <TodoList />
            </>
          } />
          <Route path="/fetch-data" element={<FetchData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
