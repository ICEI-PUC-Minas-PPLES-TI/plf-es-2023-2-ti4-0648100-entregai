import { Supermarket } from "@/types/Supermarket"
import { Button } from "@mui/material"

const SupermarketEdit = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <Button variant="contained" color="yellow">Editar Supermercado</Button>
        </div>
    )
}

export default SupermarketEdit