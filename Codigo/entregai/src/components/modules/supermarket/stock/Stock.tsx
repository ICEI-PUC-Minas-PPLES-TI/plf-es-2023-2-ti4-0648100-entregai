import { Supermarket } from "@/libs/types/Supermarket"
import Registration from "./Registration"
import Visualizer from "./Visualizer"
import { useMemo, useState } from "react"

const Stock = ({ supermarket }: { supermarket: Supermarket }) => {

    const [ supermarketDetails, setSupermarketDetails ] = useState<Supermarket>(supermarket)

    return (
        <div>
            <h1>Estoque</h1>

            <Registration setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />

            <Visualizer setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
        </div>
    )
}

export default Stock