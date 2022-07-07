import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register';
// import Post from './components/Post'
import './App.css';

function App() {
  return (
    <>
      <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
        {/* <Post/> */}
      </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
