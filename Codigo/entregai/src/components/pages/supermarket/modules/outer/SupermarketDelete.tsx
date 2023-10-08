import { Supermarket } from "@/libs/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SupermarketDelete = ({ supermarket }: { supermarket: Supermarket }) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    async function submitDelete() {
        await axios.delete(`/api/supermarket/handler?supermarketId=${supermarket.id}`)
            .then((res) => {
                if (res.status === 200) {
                    router.replace(`/app/supermarket/`)
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="contained" color="yellow" onClick={handleOpen}>
                Apagar Supermercado
            </Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>{supermarket.name}</DialogTitle>

                <DialogContent>Deseja mesmo deletar este supermercado?</DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button onClick={submitDelete}>Deletar</Button>

                </DialogActions>

            </Dialog>
        </div>
    )
}

export default SupermarketDelete