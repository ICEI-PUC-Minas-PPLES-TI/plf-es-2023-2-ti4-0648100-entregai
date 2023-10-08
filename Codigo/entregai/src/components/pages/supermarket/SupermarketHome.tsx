import { Supermarket } from "@/libs/types/Supermarket"
import SupermarketInfo from "./modules/outer/SupermarketInfo"
import SupermarketDelete from "./modules/outer/SupermarketDelete"
import SupermarketEdit from "./modules/outer/SupermarketEdit"

const SupermarketHome = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>

            <SupermarketInfo supermarket={supermarket} />

            <SupermarketDelete supermarket={supermarket} />

            <SupermarketEdit supermarket={supermarket} />

        </div>
    )
}

export default SupermarketHome