import { Supermarket } from "@/libs/types/Supermarket"
import Registration from "./Registration"
import Visualizer from "./Visualizer"
import { useMemo, useState } from "react"
import { Typography } from "@mui/material"

const Stock = ({ supermarket }: { supermarket: Supermarket }) => {

    const [ supermarketDetails, setSupermarketDetails ] = useState<Supermarket>(supermarket)

    return (
        <div>
            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                Estoque
            </Typography>

            <Registration setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />

            <Visualizer setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
        </div>
    )
}

export default Stock