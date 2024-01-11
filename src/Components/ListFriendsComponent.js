import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { Link } from 'react-router-dom'

let ListFriendsComponent = () => {

    let [friends, setFriends] = useState([])

    useEffect(() => {
        getFriends()
    }, [])

    let getFriends = async () => {
        let response = await fetch(backendURL + "/friends?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setFriends(jsonData)
        }
    }

    let deleteFriend = async (id) => {
        await fetch(backendURL + "/friends/" + id + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })

        getFriends()
    }

    return (
        <div className="main-container" >
            <h2>My friends</h2>
            {friends.length <= 0 && <h3 className="errorMessage">No friends</h3>}
            {friends.length > 0 && <table>
                <tr>
                    <th>Email</th>
                    <th></th>
                </tr>
                {friends.map(friend => (
                    <tr>
                        <td>{friend.emailFriend}</td>
                        <td><Link to="/listFriends"><img alt="delete" onClick={() => deleteFriend(friend.emailFriend)} src="redCross.png" /></Link></td>
                    </tr>
                ))
                }
            </table>
            }
        </div>
    )
}

export default ListFriendsComponent