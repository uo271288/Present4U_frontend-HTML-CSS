import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
let ListPresentsChosenByMeComponent = () => {

    let [presents, setPresents] = useState([])
    let [message, setMessage] = useState([])

    useEffect(() => {
        getPresents()
    })

    let getPresents = async () => {
        let response = await fetch(backendURL + "/presents/chosenByMe?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setPresents(jsonData)
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
        <div className="main-container" style={{ "max-width": "90%" }}>
            <h2>Presents chosen</h2>
            {presents.length <= 0 && <h3 className="errorMessage">No presents</h3>}
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            {presents.length > 0 && <table>
                <tr>
                    <th>Name</th>
                    <th>List name</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Price</th>
                </tr>
                {presents.map(present => (
                    <tr>
                        <td>{present.name}</td>
                        <td>{present.listName}</td>
                        <td>{present.description}</td>
                        <td><a href={present.url}>{present.url}</a></td>
                        <td>{present.price}€</td>
                        {present.chosenBy === null && <td>-</td>}
                    </tr>
                ))
                }
            </table>
            }
        </div>
    )
}

export default ListPresentsChosenByMeComponent