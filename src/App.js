import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login  from "./Components/LoginSignup/Login"
import Signup from './Components/LoginSignup/Signup';
import TaskManager from './Components/Home/TaskManager';
function App() {
  return (
    <>
      <Router>
        <h1>todo application</h1>
        <Routes>
          <Route path='/' element={<TaskManager />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
