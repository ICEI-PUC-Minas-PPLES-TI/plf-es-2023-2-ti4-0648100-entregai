import Registration from "./modules/management/Registration"
import Visualizer from "./modules/management/Visualizer"
import { Supermarket } from "@/libs/types/Supermarket"
import { User } from "@/libs/types/User"

const UserManagement = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <h2>Gerenciar Usuários</h2>

            <Registration systemSupermarkets={systemSupermarkets} />

            <Visualizer systemSupermarkets={systemSupermarkets} systemUsers={systemUsers} />

        </div>
    )
}

export default UserManagement