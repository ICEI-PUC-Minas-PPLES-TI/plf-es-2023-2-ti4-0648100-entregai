import axios from "axios"
import UserRegistration from "./modules/outer/UserRegistration"
import UserVisualizer from "./modules/outer/UserVisualizer"
import { Supermarket } from "@/libs/types/Supermarket"
import { getAllSupermarkets } from "@/libs/firebase/supermarketHandler"
import { User } from "@/libs/types/User"

const UserManagement = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <h2>Gerenciar Usuários</h2>

            <UserRegistration systemSupermarkets={systemSupermarkets} />

            <UserVisualizer systemSupermarkets={systemSupermarkets} systemUsers={systemUsers} />

        </div>
    )
}

export default UserManagement