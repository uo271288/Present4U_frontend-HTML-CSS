import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { backendURL } from "../Globals"

let LoginComponent = () => {

    let [message, setMessage] = useState([])
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate()

    let changeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }
    let changePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    let clickCreate = async () => {
        let response = await fetch(backendURL + "/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (response.ok) {
            navigate("/")
        } else {
            let jsonData = await response.json()
            if (Array.isArray(jsonData.error)) {
                setMessage(jsonData.error)
            } else {
                let finalError = []
                finalError.push(jsonData.error)
                setMessage(finalError)
            }
        }
    }

    return (
        <div className="main-container">
            <h2>Login</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            <div className="center-box">
                <div className='form-group'>
                    <input type='text' placeholder='Email' onChange={changeEmail} />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='Password' onChange={changePassword} />
                </div>
                <button onClick={clickCreate}>Login</button>
            </div>
        </div>
    )
}

export default LoginComponent