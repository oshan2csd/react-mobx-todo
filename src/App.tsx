import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import { Todo_Store } from './TodoList/TodoStore';

function App() {
  return (
    <>
      <TodoList todoStore={Todo_Store}></TodoList>    
    </>
  );
}

export default App;
