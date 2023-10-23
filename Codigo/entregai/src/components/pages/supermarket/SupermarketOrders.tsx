import BackButton from "@/components/misc/BackButton";
import Visualizer from "@/components/modules/order/Visualizer";
import { Supermarket } from "@/libs/types/Supermarket";
import { useState } from "react";

const SupermarketOrders = ({ supermarketInfo }: { supermarketInfo: Supermarket }) => {

    const [ supermarket, setSupermarket ] = useState<Supermarket>(supermarketInfo)

    return (
        <div>

            <BackButton />

            <h1>Encomendas</h1>

            <Visualizer supermarket={supermarket} />
  
        </div>
    )
}

export default SupermarketOrders