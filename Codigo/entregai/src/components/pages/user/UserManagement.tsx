import UserViewer from "./modules/UserViewer"
import UserRegistration from "./modules/UserRegistration"
import { getAllUsers } from "@/lib/firebase/userHandler"
import { getAllSupermarkets } from "@/lib/firebase/supermarketHandler";
import { Supermarket } from "@/types/Supermarket";
import { User } from "@/types/User";

async function fetchUsers() {
    // const response = await fetch(`${process.env.URL}/main/user/api/all`, { cache: 'no-store' })

    // const { users } = await response.json()

    // return users

    const users: User[] = await getAllUsers()

    return users;
}

async function fetchSupermarkets() {
    // const response = await fetch(`${process.env.URL}/main/supermarket/api/all`, { cache: 'no-store' })

    // const { supermarkets } = await response.json()

    // return supermarkets

    const supermarkets: Supermarket[] = await getAllSupermarkets()

    return supermarkets;
}

const UserManagement = async () => {

    const users: User[] = await fetchUsers()

    const supermarkets: Supermarket[] = await fetchSupermarkets()

    return (
        <div>
            <UserRegistration supermarkets={supermarkets} />

            <UserViewer users={users} supermarkets={supermarkets} />
        </div>
    )
}

export default UserManagement