import { getSupermarketById, getSupermarketImageUrl } from "@/libs/service/supermarketService"
import toastConfig from "@/libs/toast/toastConfig"
import { Supermarket } from "@/libs/types/Supermarket"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import EditIcon from '@mui/icons-material/Edit';

type FormDataType = {
    name: string;
    address: string;
    phone: string;
    cnpj: string;
}

const Edit = ({ supermarket, setSupermarketDetails }: { supermarket: Supermarket, setSupermarketDetails: Function }) => {

    const [open, setOpen] = useState(false)

    const { register, handleSubmit, clearErrors, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: supermarket.name,
            address: supermarket.address,
            phone: supermarket.phone,
            cnpj: supermarket.id,

        }
    });

    function submitData(data: FormDataType) {
        const { name, address, phone, cnpj } = data

        setOpen(false)

        toast.promise(
            async () => {
                return await axios.patch(`/api/supermarket/handler?supermarketId=${supermarket.id}`, { name, address, phone, cnpj })
                    .then(async (res) => {

                        const updatedSupermarket: Supermarket = await getSupermarketById(supermarket.id)

                        updatedSupermarket.imageUrl = await getSupermarketImageUrl(supermarket.id)

                        setSupermarketDetails(updatedSupermarket)
                    })
            },
            {
                pending: "Atualizando supermarcado...",
                success: "Supermarcado atualizado com sucesso!",
                error: "Erro ao atualizar supermarcado"
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Editando Supermercado: {supermarket.name}</DialogTitle>

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

                        <Button type="submit">Atualizar</Button>

                    </DialogActions>

                </form>

            </Dialog>

            <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon/>}>
                Editar Supermercado
            </Button>
        </div>
    )
}

export default Edit