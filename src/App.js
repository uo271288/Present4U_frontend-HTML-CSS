import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateUserComponent from './Components/CreateUserComponent'
import LoginComponent from './Components/LoginComponent'

let App = () => {
  return (
    <div className="App">
      <nav>
        <ul className='navbar'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/createUser">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className='main-container'>
            <h1>Welcome to Present4U!</h1>
          </div>
        } />
        <Route path="/createUser" element={
          <CreateUserComponent />
        } />
        <Route path="/login" element={
          <LoginComponent />
        } />
      </Routes>
    </div>
  )
}

export default App