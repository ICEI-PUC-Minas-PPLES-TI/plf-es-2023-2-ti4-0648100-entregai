import BackButton from "@/components/misc/BackButton";
import Visualizer from "@/components/modules/order/Visualizer";
import { Supermarket } from "@/libs/types/Supermarket";
import { Typography } from "@mui/material";
import { useState } from "react";

const SupermarketOrders = ({ supermarketInfo }: { supermarketInfo: Supermarket }) => {

    const [ supermarket, setSupermarket ] = useState<Supermarket>(supermarketInfo)

    return (
        <div>

            <BackButton />

            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                Pedidos
            </Typography>

            <Visualizer setSupermarket={setSupermarket} supermarket={supermarket} />
  
        </div>
    )
}

export default SupermarketOrders