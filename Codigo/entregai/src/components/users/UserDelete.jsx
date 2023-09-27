'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import axios from "axios";

const UserDelete = ({ user, updateUsers }) => {

    const [ open, setOpen ] = useState(false)

    const submitDelete = async () => {

        const { id } = user

        setOpen(false)

        await axios.delete(`/main/users/api?userId=${id}`)
            .then((response) => {
                if (response.status == 200) {
                    updateUsers()
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