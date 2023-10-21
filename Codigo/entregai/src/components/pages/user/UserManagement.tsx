import { useState } from "react"
import Registration from "../../modules/user/management/Registration"
import Visualizer from "../../modules/user/management/Visualizer"
import { Supermarket } from "@/libs/types/Supermarket"
import { User } from "@/libs/types/User"

const UserManagement = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {
    
    const [ users, setUsers ] = useState<User[]>(systemUsers)

    return (
        <div>

            <Registration setUsers={setUsers} systemSupermarkets={systemSupermarkets} />

            <Visualizer setUsers={setUsers} users={users} systemSupermarkets={systemSupermarkets} />

        </div>
    )
}

export default UserManagement