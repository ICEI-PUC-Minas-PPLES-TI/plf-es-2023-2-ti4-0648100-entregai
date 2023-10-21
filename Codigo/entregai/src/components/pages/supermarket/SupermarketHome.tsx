import { Supermarket } from "@/libs/types/Supermarket"
import Info from "../../modules/supermarket/home/Info"
import Delete from "../../modules/supermarket/home/Delete"
import Edit from "../../modules/supermarket/home/Edit"
import Stock from "../../modules/supermarket/stock/Stock"
import Link from "next/link"
import { Button } from "@mui/material"
import BackButton from "@/components/misc/BackButton"
import Upload from "@/components/modules/supermarket/home/Upload"
import { useState } from "react"

const SupermarketHome = ({ supermarket }: { supermarket: Supermarket }) => {

    const [ supermarketDetails, setSupermarketDetails ] = useState<Supermarket>(supermarket)

    return (
        <div>

            <BackButton />

            <Info supermarket={supermarketDetails} />

            <Upload setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />

            <Link href={`/app/supermarket/${supermarketDetails.id}/orders`}>
                <Button variant="contained" color="primary">
                    Pedidos
                </Button>
			</Link>

            <Link href={`/app/supermarket/${supermarketDetails.id}/stock`}>
                <Button variant="contained" color="primary">
                    Estoque
                </Button>
			</Link>

            <Delete supermarket={supermarketDetails} />

            <Edit setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />

        </div>
    )
}

export default SupermarketHome