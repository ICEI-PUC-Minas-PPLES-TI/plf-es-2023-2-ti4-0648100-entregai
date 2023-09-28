'use client'

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserEdit = ({ user, updateUsers }) => {

    const [ open, setOpen ] = useState(false)
    const [ editPassword, setEditPassword ] = useState(false)

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
        const {
          target: { value },
        } = event;
        setSelectedSupermarkets(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            password: "",
            confirmPassword: "",
            permissionLevel: user.permissionLevel
        }
    });

    const submitData = async (data) => {
        const { id, name, email, password, confirmPassword, permissionLevel } = data;

        if (Object.keys(errors).length > 0) {
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        setOpen(false)

        await axios.patch('/main/users/api', { id, email, password, name, permissionLevel })
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
            <IconButton color="inherit" onClick={handleOpen}>
                <SettingsIcon />
            </IconButton>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Editando Usuário: {user.name}</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>
					<DialogContent>
						<TextField 
                            margin="dense"
                            variant="standard" 
                            type="text" {...register("name", {
                                required: "Insira o nome completo" 
                            })}
                            helperText={errors.name?.message}
                            label="Nome Completo" 
                            fullWidth 
                        />

                        <TextField 
                            margin="dense"
                            variant="standard" 
                            type="email" {...register("email", {
                                required: "Insira o email" 
                            })} 
                            helperText={errors.email?.message}
                            label="Email" 
                            fullWidth 
                        />

                        {/* Seletor Supermercados */}

                        <FormControlLabel 
                            control={
                                <Checkbox 
                                defaultChecked={editPassword} 
                                onChange={() => { setEditPassword(!editPassword) }} />} 
                                label="Alterar Senha" 
                        />

						<TextField 
                            margin="dense" 
                            disabled={!editPassword} 
                            variant="standard" 
                            type="password" {...register("password", {
                                 validate: (value) => {
                                    if (editPassword) {
                                        return value ? true : "Insira a senha"
                                    }
                                    return true
                                 }
                            })} 
                            helperText={errors.password?.message}
                            label="Senha" 
                            fullWidth 
                        />

                        <TextField 
                            margin="dense" 
                            disabled={!editPassword} 
                            variant="standard" 
                            type="password" {...register("confirmPassword", { 
                                validate: (value) => { 
                                    if (editPassword) {
                                        return (
                                            value === getValues("password") || "Senhas não coincidem"
                                        )
                                    }
                                    return true
                                }
                            })}
                            helperText={errors.confirmPassword?.message}
                            label="Confirme a Senha" 
                            fullWidth 
                        />

                        <FormControlLabel control={<Checkbox defaultChecked={user.permissionLevel} {...register("permissionLevel")} />} label="Administrador" />
                        
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="supermarkets-select-label">Supermercados</InputLabel>
                            <Select
                                labelId="supermarkets-select-label"
                                id="supermarkets-select"
                                multiple
                                value={selectedSupermarkets}
                                onChange={handleChange}
                                input={<OutlinedInput label="Supermercados" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                            {supermarkets.map((sup) => (
                                <MenuItem key={sup.id} value={sup.name}>
                                    <Checkbox checked={selectedSupermarkets.indexOf(sup.name) > -1} />
                                    <ListItemText primary={sup.name} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <input type="hidden" {...register("id")} value={user.id} />

					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button type="submit">
							Atualizar
						</Button>
					</DialogActions>
				</form>
			</Dialog>

            
        </div>
    )
}

export default UserEdit