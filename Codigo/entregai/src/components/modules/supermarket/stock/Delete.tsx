import { Product } from "@/libs/types/Product"
import { Supermarket } from "@/libs/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

const Delete = ({ setSupermarketDetails, supermarket, product }: { setSupermarketDetails: Function, supermarket: Supermarket, product: Product }) => {

    const [ open, setOpen ] = useState(false)

    function submitDelete() {
        setOpen(false)

        toast.promise(
            async () => {
                await axios.delete(`/api/product/handler?supermarketId=${supermarket.id}&productId=${product.id}`)
                    .then((res) => {
                        setSupermarketDetails(res.data.supermarket)
                    })
            },
            {
                pending: "Removendo produto...",
                success: "Produto removido com sucesso!",
                error: "Erro ao remover produto"
            },
            toastConfig
        )
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

                <DialogContent><Typography variant="body1">Deseja mesmo remover este produto do estoque?</Typography></DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button onClick={submitDelete}>Remover</Button>

                </DialogActions>

            </Dialog>

        </div>
    )
}

export default Delete