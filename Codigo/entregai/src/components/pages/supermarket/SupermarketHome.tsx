import { Supermarket } from "@/libs/types/Supermarket"
import Info from "../../modules/supermarket/home/Info"
import Delete from "../../modules/supermarket/home/Delete"
import Edit from "../../modules/supermarket/home/Edit"
import Stock from "../../modules/supermarket/stock/Stock"
import Link from "next/link"
import { Button } from "@mui/material"
import BackButton from "@/components/misc/BackButton"
import { Upload } from "@mui/icons-material"
import ImageUpload from "@/components/modules/supermarket/home/ImageUpload"
import ImageDisplay from "@/components/modules/supermarket/home/ImageDisplay"

const SupermarketHome = ({ supermarket, imageUrl }: { supermarket: Supermarket, imageUrl: string }) => {
    return (
        <div>

            <BackButton />

            <Info supermarket={supermarket} />

            <ImageDisplay imageUrl={imageUrl} />

            <ImageUpload supermarket={supermarket} />

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