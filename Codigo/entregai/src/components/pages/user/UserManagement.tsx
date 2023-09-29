'use client'

import UserViewer from "./modules/UserViewer"
import UserRegistration from "./modules/UserRegistration"
import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../../types/User"

const UserManagement = () => {

    const [ users, setUsers ] = useState<User[]>([])

    const fetchUsers = () => {
        axios.get('/main/users/all/api')
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