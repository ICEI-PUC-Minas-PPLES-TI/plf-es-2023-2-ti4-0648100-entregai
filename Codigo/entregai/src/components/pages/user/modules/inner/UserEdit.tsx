import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import UserSupermarketSelect from "./UserSupermarketSelect";
import { useState } from "react";
import { User } from "@/libs/types/User";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Supermarket } from "@/libs/types/Supermarket";
import { useAuth } from "@/components/context/UserContext";

type FormDataType = {
    id: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    permissionLevel: boolean,
}

const UserEdit = ({ targetUser, systemSupermarkets }: { targetUser: User, systemSupermarkets: Supermarket[] }) => {

	const { user, fetchData } = useAuth()
    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const [ editPassword, setEditPassword ] = useState(false)
    const [ selectedSupermarkets, setSelectedSupermarkets ] = useState<string[]>([])

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            id: targetUser.id,
            name: targetUser.name,
            email: targetUser.email,
            password: "",
            confirmPassword: "",
            permissionLevel: targetUser.permissionLevel,

        }
    });

    async function submitData(data: FormDataType) {
        const { id, name, email, password, confirmPassword, permissionLevel } = data;

        // Exibir erro
        if (Object.keys(errors).length > 0) {
            return;
        }

        // Exibir erro
        if (password !== confirmPassword) {
            return;
        }

		// Usuario está tentando alterar o nivel de permissão dele mesmo
		if ((targetUser.id == user.id) && (targetUser.permissionLevel != permissionLevel)) {
			return;
		}

        setOpen(false)

        await axios.patch('/api/user/handler', { id, email, password, name, permissionLevel, selectedSupermarkets })
            .then((res) => {
                if (res.status == 200) {
					
					if (targetUser.id == user.id) {
						fetchData(user.id)
					}

                    router.replace('/app/user')
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

	return (
		<div>
			<IconButton color="inherit" onClick={handleOpen}>

				<SettingsIcon />

			</IconButton>

			<Dialog open={open} onClose={handleClose}>

				<DialogTitle>Editando Usuário: {targetUser.name}</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>

						<TextField
							margin="dense"
							variant="standard"
							type="text"
							{...register("name", {
								required: "Insira o nome completo",
							})}
							helperText={errors.name?.message}
							label="Nome Completo"
							fullWidth
						/>

						<TextField
							margin="dense"
							variant="standard"
							type="email"
							{...register("email", {
								required: "Insira o email",
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
									onChange={() => {
										setEditPassword(!editPassword);
									}}
								/>
							}
							label="Alterar Senha"
						/>

						<TextField
							margin="dense"
							disabled={!editPassword}
							variant="standard"
							type="password"
							{...register("password", {
								validate: (value) => {
									if (editPassword) {
										return value ? true : "Insira a senha";
									}
									return true;
								},
							})}
							helperText={errors.password?.message}
							label="Senha"
							fullWidth
						/>

						<TextField
							margin="dense"
							disabled={!editPassword}
							variant="standard"
							type="password"
							{...register("confirmPassword", {
								validate: (value) => {
									if (editPassword) {
										return value === getValues("password") || "Senhas não coincidem";
									}
									return true;
								},
							})}
							helperText={errors.confirmPassword?.message}
							label="Confirme a Senha"
							fullWidth
						/>

						<FormControlLabel control={<Checkbox defaultChecked={targetUser.permissionLevel} {...register("permissionLevel")} />} label="Administrador" />

                        <UserSupermarketSelect systemSupermarkets={systemSupermarkets} selectedSupermarkets={selectedSupermarkets} setSelectedSupermarkets={setSelectedSupermarkets} />

						<input type="hidden" {...register("id")} value={targetUser.id} />

					</DialogContent>

					<DialogActions>

						<Button onClick={handleClose}>Cancelar</Button>
                        
						<Button type="submit">Atualizar</Button>

					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default UserEdit;
