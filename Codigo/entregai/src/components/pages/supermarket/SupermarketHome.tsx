import { Supermarket } from "@/libs/types/Supermarket"
import Info from "../../modules/supermarket/home/Info"
import Delete from "../../modules/supermarket/home/Delete"
import Edit from "../../modules/supermarket/home/Edit"
import Stock from "../../modules/supermarket/stock/Stock"

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