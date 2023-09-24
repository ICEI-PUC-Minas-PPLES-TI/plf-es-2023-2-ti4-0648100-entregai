'use client'

import { useEffect, useState } from "react"
import UserViewer from "./UserViewer"
import axios from "axios"
import UserRegistration from "./UserRegistration"

const UserPage = () => {

    const [ users, setUsers ] = useState([])

    const fetchUsers = () => {
        axios.get('/main/users/api')
            .then((response) => {
                setUsers(response.data.users)
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <UserRegistration updateUsers={fetchUsers} />

            <UserViewer usersArray={users} updateUsers={fetchUsers} />
        </div>
    )
}

export default UserPage