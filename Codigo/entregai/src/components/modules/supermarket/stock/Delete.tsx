import { Product } from "@/libs/types/Product"
import { Supermarket } from "@/libs/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Delete = ({ supermarket, product }: { supermarket: Supermarket, product: Product }) => {

    const [ open, setOpen ] = useState(false)
    const router = useRouter()

    async function submitDelete() {
        setOpen(false)

        await axios.delete(`/api/product/handler?supermarketId=${supermarket.id}&productId=${product.id}`)
            .then((res) => {
                if (res.status === 200) {
                    router.refresh()
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            <IconButton color="inherit" onClick={handleOpen}>

                <DeleteForeverIcon />

            </IconButton>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>{product.name}</DialogTitle>

                <DialogContent>Deseja mesmo remove este produto do estoque?</DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button onClick={submitDelete}>Remover</Button>

                </DialogActions>

            </Dialog>

        </div>
    )
}

export default Delete