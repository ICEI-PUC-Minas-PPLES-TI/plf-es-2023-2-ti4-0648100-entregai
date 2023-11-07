import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, IconButton, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Selector from "./Selector"
import { Supermarket } from "@/libs/types/Supermarket"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import toastConfig from "@/libs/toast/toastConfig"
import { Add } from "@mui/icons-material"

type FormDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    permissionLevel: boolean,
}

const UserRegistration = ({ systemSupermarkets, setUsers }: { systemSupermarkets: Supermarket[], setUsers: Function }) => {

    const [open, setOpen] = useState(false)
    const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>([])

    const { register, trigger, getValues, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            permissionLevel: false,
        }
    })

    function submitData(data: FormDataType) {
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

        toast.promise(
            async () => {
                return await axios.post('/api/user/handler', { email, password, name, permissionLevel, selectedSupermarkets })
                    .then((res) => {
                        setUsers(res.data.users)
                    })
            },
            {
                pending: "Cadastrando usuário...",
                success: "Usuário cadastrado com sucesso!",
                error: "Erro ao cadastrar usuário"
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            <Fab onClick={handleOpen} style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem' }} color="secondary">
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                >
                    <Add />
                </IconButton>
            </Fab>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Adicionar Usuário</DialogTitle>

                <form onSubmit={handleSubmit(submitData)}>

                    <DialogContent>

                        <TextField
                            margin="dense"
                            variant="standard"
                            type="text"
                            {...register("name", { required: "Insira o nome completo" })}
                            error={Boolean(errors.name?.message)}
                            helperText={errors.name?.message}
                            label="Nome Completo"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            type="email"
                            {...register("email", { required: "Insira o email" })}
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            label="Email"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            type="password"
                            {...register("password", {
                                required: "Insira a senha",
                                minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" }
                            })}
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            label="Senha"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            type="password"
                            {...register("confirmPassword", {
                                validate: (value) => {
                                    return value === getValues("password") || "Senhas não coincidem";
                                },
                            })}
                            error={Boolean(errors.confirmPassword?.message)}
                            helperText={errors.confirmPassword?.message}
                            label="Confirme a Senha"
                            fullWidth
                        />

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
