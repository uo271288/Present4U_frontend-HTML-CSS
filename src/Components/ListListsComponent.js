import { useEffect, useState } from "react"
import { backendURL } from "../Globals"

let ListListsComponent = () => {

    let [lists, setLists] = useState([])
    let [message, setMessage] = useState([])

    useEffect(() => {
        getLists()
    })

    let getLists = async () => {
        let response = await fetch(backendURL + "/lists?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setLists(jsonData)
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
        <div className="main-container" >
            <h2>My friends</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            {lists.length <= 0 && <h3 className="errorMessage">No lists</h3>}
            {lists.length > 0 &&
                lists.map(list => (
                    <ul>
                        <li>{list.name}</li>
                    </ul>
                ))
            }
        </div>
    )
}

export default ListListsComponent