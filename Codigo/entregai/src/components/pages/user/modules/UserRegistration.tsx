'use client'

import { SelectChangeEvent, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Supermarket } from "../../../../types/Supermarket";
import { useRouter } from "next/navigation";

interface RegistrationFormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    permissionLevel: boolean,
}

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

const UserRegistration = ({ supermarkets }: { supermarkets: Supermarket[] }) => {

    const [ open, setOpen ] = useState(false)
    const [ selectedSupermarkets, setSelectedSupermarkets ] = useState<string[]>([]);
    const router = useRouter()

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        // const { value } = event.target as HTMLButtonElement
        // setSelectedSupermarkets(typeof value === 'string' ? value.split(',') : value);
        setSelectedSupermarkets(event.target.value as string[]);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            permissionLevel: false
        }
    });

    const submitData = async (data: RegistrationFormData) => {
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


        // Client side
        await axios.post('/main/user/api', { email, password, name, permissionLevel, selectedSupermarkets })
            .then((response) => {
                if (response.status == 200) {
                    router.refresh()
                }
            }
        )
    }

    const handleOpen = () => { setOpen(true) }

    const handleClose = () => { setOpen(false) }

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
                                // renderValue={(selected) => selected.join(', ')}
                                renderValue={(selected) =>
                                    selected.map((supermarketId) => {
                                        const selectedSupermarket = supermarkets.find((sup) => sup.id === supermarketId);
                                        return selectedSupermarket ? selectedSupermarket.name : '';
                                    }).join(', ')
                                }
                                MenuProps={MenuProps}
                            >
                            {/* {supermarkets.map((sup: Supermarket) => (
                                <MenuItem key={sup.id} value={sup.id}>
                                    <Checkbox checked={selectedSupermarkets.indexOf(sup.id) > -1} />
                                    <ListItemText primary={sup.name} />
                                </MenuItem>
                            ))} */}
                                {supermarkets.map((sup: Supermarket) => (
                                    <MenuItem key={sup.id} value={sup.id}>
                                        <Checkbox checked={selectedSupermarkets.indexOf(sup.id) > -1} />
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