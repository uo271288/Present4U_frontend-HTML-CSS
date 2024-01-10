import { useEffect, useState } from "react"
import { backendURL } from "../Globals"

let ListPresentsComponent = () => {

    let [presents, setPresents] = useState([])

    useEffect(() => {
        getPresents()
    }, [])

    let getPresents = async () => {
        let response = await fetch(backendURL + "/presents?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setPresents(jsonData)
        }
    }

    return (
        <div className="main-container" style={{ "max-width": "90%" }}>
            <h2>My presents</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Price</th>
                    <th>Chosen by</th>
                </tr>
                {
                    presents.map(present => (
                        <tr>
                            <td>{present.name}</td>
                            <td>{present.description}</td>
                            <td><a href={present.url}>{present.url}</a></td>
                            <td>{present.price}€</td>
                            {present.chosenBy === null && <td>-</td>}
                            {present.chosenBy !== null && <td>{present.chosenBy}</td>}
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default ListPresentsComponent