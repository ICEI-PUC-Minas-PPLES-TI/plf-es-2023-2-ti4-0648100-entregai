'use client'

import UserViewer from "./modules/UserViewer"
import UserRegistration from "./modules/UserRegistration"
import { Supermarket } from "@/types/Supermarket";
import { User } from "@/types/User";
import axios from "../../../../node_modules/axios/index"
import { useEffect, useState } from "react"

const UserManagement = () => {

    const [ users, setUsers ] = useState<User[]>([])
    const [ supermarkets, setSupermarkets ] = useState<Supermarket[]>([])

    async function fetchUsers() {
        await axios.get('/main/user/api/all')
        .then((response) => {
            setUsers(response.data.users)
        })
    }

    async function fetchSupermarkets() {
        await axios.get('/main/supermarket/api/all')
            .then((response) => {
                setSupermarkets(response.data.supermarkets)
            })
    }

    useEffect(() => {

        fetchSupermarkets()

        fetchUsers()

    }, [])

    return (
        <div>
            <UserRegistration supermarkets={supermarkets} updateUsers={fetchUsers} />

            <UserViewer users={users} supermarkets={supermarkets} updateUsers={fetchUsers} updateSupermarkets={fetchSupermarkets} />
        </div>
    )
}

export default UserManagement