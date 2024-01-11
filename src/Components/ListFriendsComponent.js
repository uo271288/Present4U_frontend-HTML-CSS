import { useEffect, useState } from "react"
import { backendURL } from "../Globals"

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

    return (
        <div className="main-container" >
            <h2>My friends</h2>
            {friends.length <= 0 && <h3 className="errorMessage">No friends</h3>}
            {friends.length > 0 && <table>
                <tr>
                    <th>Email</th>
                </tr>
                {friends.map(friend => (
                    <tr>
                        <td>{friend.emailFriend}</td>
                    </tr>
                ))
                }
            </table>
            }
        </div>
    )
}

export default ListFriendsComponent