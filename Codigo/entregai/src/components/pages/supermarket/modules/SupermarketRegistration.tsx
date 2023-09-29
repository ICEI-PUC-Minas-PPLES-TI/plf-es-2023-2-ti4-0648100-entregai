'use client'

import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, useTheme } from "@mui/material"
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";

interface RegistrationFormData {
    name: string,
    address: string,
    phone: string,
    cnpj: string,
}

const SupermarketRegistration = ({ updateSupermarkets }: { updateSupermarkets: Function }) => {

    const [ open, setOpen ] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            cnpj: ""
        }
    })

    const submitData = async (data: RegistrationFormData) => {
        const { name, address, phone, cnpj } = data

        // Backdrop

        setOpen(false)

        await axios.post('/main/supermarket/api', { name, address, phone, cnpj })
            .then((response) => {
                if (response.status == 200) {
                    updateSupermarkets()
                }
            }
        )
    }

    const handleOpen = () => { setOpen(true) }

    const handleClose = () => { setOpen(false) }

	return (
		<div>
			<Button variant="contained" color="yellow" onClick={handleOpen}>
				Cadastrar Supermercado
			</Button>

			<Dialog open={open} onClose={handleClose}>

				<DialogTitle>Cadastrar Novo Supermercado</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>
						<TextField margin="dense" variant="standard" {...register("name")} label="Nome" fullWidth />

						<TextField margin="dense" variant="standard" {...register("address")} label="Endereço" fullWidth />

						<TextField margin="dense" variant="standard" {...register("phone")} label="Telefone" fullWidth />

						<TextField margin="dense" variant="standard" {...register("cnpj")} label="CNPJ" fullWidth />
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

export default SupermarketRegistration
