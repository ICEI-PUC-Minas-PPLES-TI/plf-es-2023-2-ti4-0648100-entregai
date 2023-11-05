import BackButton from "@/components/misc/BackButton";
import Visualizer from "@/components/modules/order/Visualizer";
import { Supermarket } from "@/libs/types/Supermarket";
import { useState } from "react";

const SupermarketOrders = ({ supermarketInfo }: { supermarketInfo: Supermarket }) => {

    const [ supermarket, setSupermarket ] = useState<Supermarket>(supermarketInfo)

    return (
        <div>

            <BackButton />

            <h1>Pedidos</h1>

            <Visualizer setSupermarket={setSupermarket} supermarket={supermarket} />
  
        </div>
    )
}

export default SupermarketOrders