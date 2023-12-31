import { useState } from "react"
import { backendURL } from "../Globals"

let CreatePresentComponent = () => {

    let [message, setMessage] = useState([])
    let [name, setName] = useState("")
    let [description, setDescription] = useState("")
    let [url, setUrl] = useState("")
    let [price, setPrice] = useState(0.0)

    let changeName = (e) => {
        setName(e.currentTarget.value)
    }
    let changeDescription = (e) => {
        setDescription(e.currentTarget.value)
    }
    let changeUrl = (e) => {
        setUrl(e.currentTarget.value)
    }
    let changePrice = (e) => {
        setPrice(e.currentTarget.value)
    }

    let clickCreate = async () => {
        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                description: description,
                url: url,
                price: price
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
    }

    return (
        <div className="main-container">
            <h2>Create a present for a friend</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            <div className="center-box">
                <div className='form-group'>
                    <input type='text' placeholder='Name' onChange={changeName} />
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Description' onChange={changeDescription} />
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='https://example.com' onChange={changeUrl} />
                </div>
                <div className='form-group'>
                    <input type='number' step=".01" placeholder='10.0' onChange={changePrice} />
                </div>
                <button onClick={clickCreate}>Create present</button>
            </div>
        </div>
    )
}

export default CreatePresentComponent