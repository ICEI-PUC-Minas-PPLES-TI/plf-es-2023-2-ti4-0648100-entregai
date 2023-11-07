import { useState } from "react"
import Registration from "../../modules/user/management/Registration"
import Visualizer from "../../modules/user/management/Visualizer"
import { Supermarket } from "@/libs/types/Supermarket"
import { User } from "@/libs/types/User"
import { Typography } from "@mui/material"

const UserManagement = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {

    const [users, setUsers] = useState<User[]>(systemUsers)

    return (
        <div>

            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0', fontWeight: 'fontWeightRegular' }}>
                Usuários
            </Typography>

            <Visualizer setUsers={setUsers} users={users} systemSupermarkets={systemSupermarkets} />

            <Registration setUsers={setUsers} systemSupermarkets={systemSupermarkets} />


        </div>
    )
}

export default UserManagement