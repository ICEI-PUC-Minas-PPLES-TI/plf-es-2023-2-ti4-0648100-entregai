'use client'

import { Supermarket } from "@/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SupermarketDelete = ({ supermarket }: { supermarket: Supermarket }) => {

    const [ open, setOpen ] = useState(false)

    const router = useRouter()

    const submitDelete = async () => {

        setOpen(false)

        // Client side request
        await axios.delete(`/main/supermarket/api?supermarketId=${supermarket.id}`)
            .then((response) => {
                if (response.status == 200) {
                    router.push('/main/supermarket')
                }
            }
        )
    }

    const handleOpen = () => { setOpen(true) }

    const handleClose = () => { setOpen(false) }

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