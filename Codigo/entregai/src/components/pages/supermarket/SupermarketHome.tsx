import { Supermarket } from "@/libs/types/Supermarket"
import Info from "../../modules/supermarket/home/Info"
import Delete from "../../modules/supermarket/home/Delete"
import Edit from "../../modules/supermarket/home/Edit"
import Stock from "../../modules/supermarket/stock/Stock"
import Link from "next/link"
import { Button } from "@mui/material"
import BackButton from "@/components/misc/BackButton"

const SupermarketHome = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>

            <BackButton />

            <Info supermarket={supermarket} />

            <Link href={`/app/supermarket/${supermarket.id}/orders`}>
                <Button variant="contained" color="yellow">
                    Encomendas
                </Button>
			</Link>

            <Delete supermarket={supermarket} />

            <Edit supermarket={supermarket} />

            <Stock supermarket={supermarket} />

        </div>
    )
}

export default SupermarketHome