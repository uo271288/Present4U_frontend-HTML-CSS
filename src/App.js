import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from "react"
import CreateUserComponent from './Components/CreateUserComponent'
import LoginComponent from './Components/LoginComponent'
import { backendURL } from "./Globals";

let App = () => {

  let [login, setLogin] = useState(false)
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    checkLogin()
  }, [])

  let checkLogin = async () => {
    if (localStorage.getItem("apiKey")) {
      let response = await fetch(backendURL + "/users/checkLogin?apiKey=" + localStorage.getItem("apiKey"))
      if (response.status === 401) {
        setLogin(false)
        navigate("/login")
        return
      } else {
        setLogin(true)
      }
    } else {
      setLogin(false)
      if (!["/login", "/register"].includes(location.pathname)) {
        navigate("/login")
      }
    }
  }

  let disconnect = async () => {
    let response = await fetch(backendURL + "/users/disconnect?apiKey=" + localStorage.getItem("apiKey"))
    if (response.ok) {
      localStorage.removeItem("apiKey")
      localStorage.removeItem("idUser")
      localStorage.removeItem("email")
      setLogin(false)
      navigate("/login")
    }
  }

  return (
    <div className="App">
      {!login &&
        <nav>
          <ul className='navbar'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/createUser">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>}
      {login &&
        <nav>
          <ul className='navbar'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/disconnect" onClick={disconnect}>Disconnect</Link></li>
          </ul>
        </nav>}
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
          <LoginComponent setLogin={setLogin} />
        } />
      </Routes>
    </div>
  )
}

export default App