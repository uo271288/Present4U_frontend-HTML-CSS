import { useState, useRef } from "react"
import { backendURL } from "../Globals"

let CreatePresentComponent = () => {

    let [message, setMessage] = useState([])
    let name = useRef("")
    let description = useRef("")
    let url = useRef("")
    let listName = useRef("")
    let price = useRef(0.0)

    let clickCreate = async () => {
        let listResponse = await fetch(backendURL + "/lists/name/" + listName.current.value + "?apiKey=" + localStorage.getItem("apiKey"))
        let listId
        if (listResponse.ok) {
            let jsonData = await listResponse.json()
            listId = jsonData.id
        } else {
            let jsonData = await listResponse.json()
            if (Array.isArray(jsonData.error)) {
                setMessage(jsonData.error)
            } else {
                let finalError = []
                finalError.push(jsonData.error)
                setMessage(finalError)
            }
        }

        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.current.value,
                description: description.current.value,
                url: url.current.value,
                listId: listId,
                price: price.current.value
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
        description.current.value = ""
        url.current.value = ""
        listName.current.value = ""
        price.current.value = ""
    }

    return (
        <div className="main-container">
            <h2>Create a present</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            <div className="center-box">
                <div className='form-group'>
                    <input ref={name} type='text' placeholder='Name' />
                </div>
                <div className='form-group'>
                    <input ref={description} type='text' placeholder='Description' />
                </div>
                <div className='form-group'>
                    <input ref={url} type='text' placeholder='https://example.com' />
                </div>
                <div className='form-group'>
                    <input ref={price} type='number' step=".01" placeholder='10.0' />
                </div>
                <div className='form-group'>
                    <input ref={listName} type='text' placeholder='Wishlist' />
                </div>
                <button onClick={clickCreate}>Create present</button>
            </div>
        </div>
    )
}

export default CreatePresentComponent