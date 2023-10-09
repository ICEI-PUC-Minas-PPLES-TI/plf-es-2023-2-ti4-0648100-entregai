import { Supermarket } from "@/libs/types/Supermarket"
import Info from "./modules/home/Info"
import Delete from "./modules/home/Delete"
import Edit from "./modules/home/Edit"
import Stock from "./modules/home/stock/Stock"

const SupermarketHome = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>

            <Info supermarket={supermarket} />

            <Delete supermarket={supermarket} />

            <Edit supermarket={supermarket} />

            <Stock supermarket={supermarket} />

        </div>
    )
}

export default SupermarketHome