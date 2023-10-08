import { useAuth } from "@/components/context/UserContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormDataType = {
    name: string;
    address: string;
    phone: string;
    cnpj: string;
}

const SupermarketRegistration = () => {

    const router = useRouter()
    const { user } = useAuth()
    const [ open, setOpen ] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            cnpj: ""
        }
    })

    async function submitData(data: FormDataType) {
        const { name, address, phone, cnpj } = data

        setOpen(false)

        await axios.post('/api/supermarket/handler', { name, address, phone, cnpj })
            .then((res) => {
                if (res.status == 200) {
                    router.replace('/app/supermarket')
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

	return (
		<div>
			
            {user.permissionLevel && <Button variant="contained" color="yellow" onClick={handleOpen}>
				Cadastrar Supermercado
			</Button>}

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

export default SupermarketRegistration;
