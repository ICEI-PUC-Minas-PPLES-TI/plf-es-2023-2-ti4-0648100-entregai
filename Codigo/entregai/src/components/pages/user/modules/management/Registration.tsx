import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Selector from "./Selector"
import { Supermarket } from "@/libs/types/Supermarket"
import axios from "axios"
import { useRouter } from "next/navigation"

type FormDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    permissionLevel: boolean,
}

const UserRegistration = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const [ selectedSupermarkets, setSelectedSupermarkets ] = useState<string[]>([])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            permissionLevel: false,
        }
    })

    async function submitData(data: FormDataType) {
        const { name, email, password, confirmPassword, permissionLevel } = data;

        // Exibir erro
        if (Object.keys(errors).length > 0) {
            return;
        }

        // Exibir erro
        if (password !== confirmPassword) {
            return;
        }

        setOpen(false)

        await axios.post('/api/user/handler', { email, password, name, permissionLevel, selectedSupermarkets })
            .then((res) => {
                if (res.status == 200) {
                    router.replace('/app/user')
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="contained" color="yellow" onClick={handleOpen}>Adicionar Usuário</Button>
        
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Adicionar Usuário</DialogTitle>

                <form onSubmit={handleSubmit(submitData)}>

                    <DialogContent>

                        <TextField margin="dense" variant="standard" type="text" {...register("name", { required: "Insira o nome completo" })} label="Nome Completo" fullWidth />

                        <TextField margin="dense" variant="standard" type="email" {...register("email", { required: "Insira o email" })} label="Email" fullWidth />

                        <TextField margin="dense" variant="standard" type="password" {...register("password", { required: "Insira a senha" })} label="Senha" fullWidth />

                        <TextField margin="dense" variant="standard" type="password" {...register("confirmPassword", { required: "Repita a senha" })} label="Confirme a Senha" fullWidth />

                        <FormControlLabel control={<Checkbox {...register("permissionLevel")} />} label="Administrador" />

                        <Selector systemSupermarkets={systemSupermarkets} selectedSupermarkets={selectedSupermarkets} setSelectedSupermarkets={setSelectedSupermarkets} />

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleClose}>Cancelar</Button>

						<Button type="submit">Cadastrar</Button>

                    </DialogActions>

                </form>

            </Dialog>
        </div>
    )
}

export default UserRegistration
