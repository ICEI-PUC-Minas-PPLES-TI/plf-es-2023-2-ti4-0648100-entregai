import Registration from "../../modules/user/management/Registration"
import Visualizer from "../../modules/user/management/Visualizer"
import { Supermarket } from "@/libs/types/Supermarket"
import { User } from "@/libs/types/User"

const UserManagement = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <Registration systemSupermarkets={systemSupermarkets} />

            <Visualizer systemSupermarkets={systemSupermarkets} systemUsers={systemUsers} />

        </div>
    )
}

export default UserManagement