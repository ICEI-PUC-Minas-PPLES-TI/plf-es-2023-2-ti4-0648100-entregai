import BackButton from "@/components/misc/BackButton";
import Stock from "@/components/modules/supermarket/stock/Stock";
import { Supermarket } from "@/libs/types/Supermarket";

const SupermarketStock = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>

            <BackButton />

            <Stock supermarket={supermarket} />

        </div>
    )
}

export default SupermarketStock