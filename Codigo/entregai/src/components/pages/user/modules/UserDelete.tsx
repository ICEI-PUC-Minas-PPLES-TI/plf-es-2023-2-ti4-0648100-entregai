'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import axios from "axios";
import { User } from "../../../../types/User";
import { useRouter } from "next/navigation";

const UserDelete = ({ user }: { user: User }) => {

    const [ open, setOpen ] = useState(false)
    const router = useRouter()

    const submitDelete = async () => {

        setOpen(false)

        // Client side request
        await axios.delete(`/main/user/api?userId=${user.id}`)
            .then((response) => {
                if (response.status == 200) {
                    router.refresh()
                }
            }
        )
    }

    const handleOpen = () => { setOpen(true) }

    const handleClose = () => { setOpen(false) }

    return (
        <div>
            <IconButton color="inherit" onClick={handleOpen}>
                <DeleteForeverIcon/>
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{user.name}</DialogTitle>

                <DialogContent>Deseja mesmo deletar o este usuário?</DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={submitDelete}>Deletar</Button>
                </DialogActions>

            </Dialog>
        </div>        
    )
}

export default UserDelete