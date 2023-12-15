import toastConfig from "@/libs/toast/toastConfig"
import { Supermarket } from "@/libs/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import DeleteIcon from '@mui/icons-material/Delete';

const Delete = ({ supermarket }: { supermarket: Supermarket }) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    function submitDelete() {

        setOpen(false)

        toast.promise(
            async () => {
                return await axios.delete(`/api/supermarket/handler?supermarketId=${supermarket.id}`)
                    .then((res) => {
                        router.replace(`/app/supermarket/`)
                    })
            },
            {
                pending: "Deletando supermercado...",
                success: "Supermercado deletado com sucesso!",
                error: "Erro ao deletar supermercado"
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen} startIcon={<DeleteIcon/>}>
                Apagar Supermercado
            </Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>{supermarket.name}</DialogTitle>

                <DialogContent>
                    <Typography variant="body1">Deseja mesmo deletar este supermercado?</Typography>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button onClick={submitDelete}>Deletar</Button>

                </DialogActions>

            </Dialog>
        </div>
    )
}

export default Delete