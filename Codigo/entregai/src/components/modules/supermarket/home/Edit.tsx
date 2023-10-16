import { Supermarket } from "@/libs/types/Supermarket"
import { Button } from "@mui/material"

const Edit = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <Button variant="contained">Editar Supermercado</Button>
        </div>
    )
}

export default Edit