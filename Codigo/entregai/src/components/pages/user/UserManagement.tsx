import UserViewer from "./modules/UserViewer"
import UserRegistration from "./modules/UserRegistration"

async function fetchUsers() {
    const response = await fetch(`${process.env.URL}/main/user/api/all`, { cache: 'no-store' })

    const { users } = await response.json()

    return users
}

async function fetchSupermarkets() {
    const response = await fetch(`${process.env.URL}/main/supermarket/api/all`, { cache: 'no-store' })

    const { supermarkets } = await response.json()

    return supermarkets
}

const UserManagement = async () => {

    const users = await fetchUsers()

    const supermarkets = await fetchSupermarkets()

    return (
        <div>
            <UserRegistration supermarkets={supermarkets} />

            <UserViewer users={users} supermarkets={supermarkets} />
        </div>
    )
}

export default UserManagement