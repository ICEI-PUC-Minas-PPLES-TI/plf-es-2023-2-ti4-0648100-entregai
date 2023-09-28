'use client'

import UserViewer from "./modules/UserViewer"
import UserRegistration from "./modules/UserRegistration"
import { useEffect, useState } from "react"
import axios from "axios"

const UserManagement = () => {

    const [ users, setUsers ] = useState([])

    const fetchUsers = () => {
        axios.get('/main/users/api')
            .then((response) => {
                setUsers(response.data.users)
            }
        )
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

export default UserManagement