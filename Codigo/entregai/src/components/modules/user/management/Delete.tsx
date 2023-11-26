import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/libs/types/User";
import { useAuth } from "@/components/context/UserContext";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

const Delete = ({ targetUser, setUsers }: { targetUser: User, setUsers: Function }) => {

    const [ open, setOpen ] = useState(false)
    const { user } = useAuth()

    function submitDelete() {

        if (targetUser.id == user.id) {
            toast.error("Você não pode deletar a si mesmo", toastConfig)
            return;
        }

        setOpen(false)

        toast.promise(
            async () => {
                return await axios.delete(`/api/user/handler?userId=${targetUser.id}`)
                    .then((res) => {
                        setUsers(res.data.users)
                    })
            },
            {
                pending: "Deletando usuário...",
                success: "Usuário deletado com sucesso!",
                error: "Erro ao deletar usuário"
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <IconButton color="inherit" onClick={handleOpen}>

                <DeleteForeverIcon/>

            </IconButton>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Deletar Usuário</DialogTitle>

                <DialogContent>
                    <Typography variant="body1">Tem certeza que deseja deletar o usuário <strong>{targetUser.name}?</strong></Typography>
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