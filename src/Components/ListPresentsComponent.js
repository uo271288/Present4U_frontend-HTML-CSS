import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { Link } from 'react-router-dom'

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

    let deletePresent = async (id) => {
        await fetch(backendURL + "/presents/" + id + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        getPresents()
    }

    return (
        <div className="main-container" style={{ "max-width": "90%" }}>
            <h2>My presents</h2>
            {presents.length <= 0 && <h3>No presents</h3>}
            {presents.length > 0 && <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Url</th>
                    <th>Price</th>
                    <th>Chosen by</th>
                    <th></th>
                    <th></th>
                </tr>
                {presents.map(present => (
                    <tr>
                        <td>{present.name}</td>
                        <td>{present.description}</td>
                        <td><a href={present.url}>{present.url}</a></td>
                        <td>{present.price}€</td>
                        {present.chosenBy === null && <td>-</td>}
                        {present.chosenBy !== null && <td>{present.chosenBy}</td>}
                        <td><Link to="/listPresents"><img alt="delete" onClick={() => deletePresent(present.id)} src="redCross.png" /></Link></td>
                        <td><Link to={"/modifyPresent/" + present.id}><img alt="modify" src="greenPencil.png" /></Link></td>
                    </tr>
                ))
                }
            </table>
            }
        </div>
    )
}

export default ListPresentsComponent