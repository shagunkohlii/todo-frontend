import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/LoginSignup/Login"
import Signup from './Components/LoginSignup/Signup';
// import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Tasks from './Components/Tasks/Tasks';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Tasks />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;