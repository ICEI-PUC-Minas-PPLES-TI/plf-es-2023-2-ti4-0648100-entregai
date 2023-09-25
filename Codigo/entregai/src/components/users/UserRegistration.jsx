'use client'

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UserRegistration = ({ updateUsers }) => {

    const [ open, setOpen ] = useState(false)
    const [ supermarkets, setSupermarkets ] = useState([])
    const [ selectedSupermarkets, setSelectedSupermarkets ] = useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {  value } = event.target;
        setSelectedSupermarkets(value);
    };

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            permissionLevel: false
        }
    });

    const submitData = async (data) => {
        const { name, email, password, confirmPassword, permissionLevel } = data;

        console.log(selectedSupermarkets);

        if (Object.keys(errors).length > 0) {
            return;
        }

        if (password !== confirmPassword) {
            // Display error message
            return;
        }

        setOpen(false)

        await axios.post('/main/users/api', { email, password, name, permissionLevel })
            .then((response) => {
                if (response.status == 200) {
                    updateUsers()
                }
            }
        )
    }

    const handleOpen = () => { setOpen(true) }

    const handleClose = () => { setOpen(false) }

    useEffect(() => {
        axios.get('/main/supermarket/api')
            .then((response) => {
                setSupermarkets(response.data.supermarkets)
            })
    }, [])

    return (
        <div>
			<Button variant="contained" color="yellow" onClick={handleOpen}>
				Novo Usuario
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Cadastrar Novo Usuario</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>
					<DialogContent>

						<TextField margin="dense" variant="standard" type="text" {...register("name", { required: "Insira o nome completo" })} label="Nome Completo" fullWidth />

						<TextField margin="dense" variant="standard" type="email" {...register("email", { required: "Insira o email" })} label="Email" fullWidth />
                        
						<TextField margin="dense" variant="standard" type="password" {...register("password", { required: "Insira a senha" })} label="Senha" fullWidth />

                        <TextField margin="dense" variant="standard" type="password" {...register("confirmPassword", { required: "Repita a senha" })} label="Confirme a Senha" fullWidth />

                        <FormControlLabel control={<Checkbox {...register("permissionLevel")} />} label="Administrador" />
					
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="supermarkets-select-label">Supermercados</InputLabel>
                            <Select
                                labelId="supermarkets-select-label"
                                id="supermarkets-select"
                                multiple
                                value={selectedSupermarkets}
                                onChange={handleChange}
                                input={<OutlinedInput label="Supermercados" />}
                                renderValue={(selected) => selected.map((sup) => sup.name).join(', ')}
                                MenuProps={MenuProps}
                            >
                            {supermarkets.map((sup) => (
                                <MenuItem key={sup.id} value={sup}>
                                    <Checkbox checked={selectedSupermarkets.some(selectedSup => selectedSup.id === sup.id)} />
                                    <ListItemText primary={sup.name} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>

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