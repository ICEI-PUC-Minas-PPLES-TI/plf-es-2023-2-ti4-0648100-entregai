import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/libs/types/User";
import { useAuth } from "@/components/context/UserContext";

const Delete = ({ targetUser }: { targetUser: User }) => {

    const [ open, setOpen ] = useState(false)
    const { user } = useAuth()
    const router = useRouter()

    async function submitDelete() {

        if (targetUser.id == user.id) {
            // Exibir mensagem de usuário não pode se apagar
            return
        }

        await axios.delete(`/api/user/handler?userId=${user.id}`)
            .then((res) => {
                if (res.status === 200) {
                    router.replace('/app/user')
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <IconButton color="inherit" onClick={handleOpen}>

                <DeleteForeverIcon/>

            </IconButton>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>{user.name}</DialogTitle>

                <DialogContent>Deseja mesmo deletar este usuário?</DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button onClick={submitDelete}>Deletar</Button>

                </DialogActions>

            </Dialog>
        </div>      
    )
}

export default Delete