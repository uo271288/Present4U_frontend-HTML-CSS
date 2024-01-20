import { useEffect, useState, useRef } from "react"
import { backendURL } from "../Globals"
import { Link } from 'react-router-dom'

let ListFriendsComponent = () => {

    let [friends, setFriends] = useState([])
    let email = useRef("")
    let listName = useRef("")
    let [message, setMessage] = useState([])

    useEffect(() => {
        getFriends()
    })

    let getFriends = async () => {
        let response = await fetch(backendURL + "/friends?apiKey=" + localStorage.getItem("apiKey"))

        if (response.ok) {
            let jsonData = await response.json()
            setFriends(jsonData.slice().sort((a, b) => {
                return a['listName'].localeCompare(b['listName'])
            }))
        }
    }

    let deleteFriend = async (emailFriend, listId) => {
        await fetch(backendURL + "/friends/" + emailFriend + "/" + listId + "?apiKey=" + localStorage.getItem("apiKey"), {
            method: "DELETE"
        })
    }

    let addFriend = async () => {
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

        let response = await fetch(backendURL + "/friends?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.current.value,
                idList: listId
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

        email.current.value = ""
        listName.current.value = ""
        getFriends()
    }

    return (
        <div className="main-container" >
            <h2>My friends</h2>
            {message != null && message.map(e => { return <p className="errorMessage">{e}</p> })}
            {friends.length <= 0 && <h3 className="errorMessage">No friends</h3>}
            {friends.length > 0 && <div>
                {friends.map(friend => (
                    <dl>
                        <dt>{friend.listName}</dt>
                        <dd>{friend.emailFriend}
                            <Link to="/listFriends" style={{ float: "right" }}>
                                <img alt="delete" onClick={() => {
                                    deleteFriend(friend.emailFriend, friend.listId)
                                }} src="redCross.png" />
                            </Link>
                        </dd>
                        <hr style={{borderTop: "2px dotted #aaa"}}/>
                    </dl>
                ))
                }
            </div>
            }
            <div className='friend-form-group'>
                <input ref={email} className="add-friend-input" type='text' placeholder='Email' />
                <input ref={listName} className="add-friend-input" type='text' placeholder='Wishlist' />
                <button className="add-friend-button" onClick={addFriend}>Add friend</button>
            </div>
        </div>
    )
}

export default ListFriendsComponent