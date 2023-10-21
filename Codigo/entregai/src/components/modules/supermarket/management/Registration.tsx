import { useAuth } from "@/components/context/UserContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

type FormDataType = {
    name: string;
    address: string;
    phone: string;
    cnpj: string;
}

const Registration = ({ setSupermarkets }: { setSupermarkets: Function }) => {

    const { user } = useAuth()
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            cnpj: ""
        }
    })

    function submitData(data: FormDataType) {
        const { name, address, phone, cnpj } = data

        setOpen(false)

        toast.promise(
            async () => {
                return await axios.post('/api/supermarket/handler', { name, address, phone, cnpj })
                    .then((res) => {
                        setSupermarkets(res.data.supermarkets)
                    })
            },
            {
                pending: 'Cadastrando supermercado...',
                success: 'Supermercado cadastrado com sucesso!',
                error: 'Não foi possível cadastrar o supermercado.',
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            {user.permissionLevel &&
                <Fab onClick={handleOpen}
                    sx={{
                        backgroundColor: 'secondary.main',
                        color: 'secondary.contrastText',
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        '&:hover': {
                            backgroundColor: 'secondary.dark',
                        },
                    }}>
                    <AddIcon />
                </Fab>
            }

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Cadastrar Novo Supermercado</DialogTitle>

                <form onSubmit={handleSubmit(submitData)}>

                    <DialogContent>

                        <TextField
                            margin="dense"
                            variant="standard"
                            {...register("name", { required: "Insira o nome do supermercado" })}
                            error={Boolean(errors.name?.message)}
                            helperText={errors.name?.message}
                            label="Nome"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            {...register("address", { required: "Insira o endereço" })}
                            error={Boolean(errors.address?.message)}
                            helperText={errors.address?.message}
                            label="Endereço"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            {...register("phone", {
                                required: "Insira o telefone",
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Insira apenas números"
                                }
                            })}
                            error={Boolean(errors.phone?.message)}
                            helperText={errors.phone?.message}
                            label="Telefone"
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            variant="standard"
                            {...register("cnpj", {
                                required: "Insira o CNPJ",
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Insira apenas números"
                                }
                            })}
                            error={Boolean(errors.cnpj?.message)}
                            helperText={errors.cnpj?.message}
                            label="CNPJ"
                            fullWidth
                        />

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleClose}>Cancelar</Button>

                        <Button type="submit">Cadastrar</Button>

                    </DialogActions>

                </form>

            </Dialog>

        </div>
    );
};

export default Registration;
