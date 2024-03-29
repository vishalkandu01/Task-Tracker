// import './App.css'

import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './components/Todo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const headStyle = {
    textAlign: "center"
  }

  return (
    <>
      <div>
        <h1 style={headStyle}>Todo List</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
