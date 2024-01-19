import { useState, useRef } from "react"
import { backendURL } from "../Globals"

let CreateListComponent = () => {

    let [message, setMessage] = useState([])
    let name = useRef("")

    let clickCreate = async () => {

        let response = await fetch(backendURL + "/lists?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.current.value
            })
        })
        if (!response.ok) {
            let jsonData = await response.json()
            if (Array.isArray(jsonData.error)) {
                setMessage(jsonData.error)
            } else {
                let finalError = []
                finalError.push(jsonData.error)
                setMessage(finalError)
            }
        }

        name.current.value = ""
    }

    return (
        <div className="main-container">
            <h2>Create list</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            <div className="center-box">
                <div className='form-group'>
                    <input ref={name} type='text' placeholder='Name' />
                </div>
                <button onClick={clickCreate}>Create list</button>
            </div>
        </div>
    )
}

export default CreateListComponent