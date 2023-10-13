import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";

const SupermarketOrders = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>

            <BackButton />

            <h1>Encomendas</h1>
  
        </div>
    )
}

export default SupermarketOrders