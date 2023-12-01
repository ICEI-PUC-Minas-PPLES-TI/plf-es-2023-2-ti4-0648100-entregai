import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Selector from "./Selector";
import { useState } from "react";
import { User } from "@/libs/types/User";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Supermarket } from "@/libs/types/Supermarket";
import { useAuth } from "@/components/context/UserContext";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

type FormDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    permissionLevel: boolean,
}

const Edit = ({ targetUser, systemSupermarkets, setUsers }: { targetUser: User, systemSupermarkets: Supermarket[], setUsers: Function }) => {

	const { user, fetchData } = useAuth()
    const router = useRouter()
    const [ open, setOpen ] = useState(false)
    const [ editPassword, setEditPassword ] = useState(false)
    const [ selectedSupermarkets, setSelectedSupermarkets ] = useState<string[]>(targetUser.selectedSupermarkets)

    const { register, handleSubmit, clearErrors, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: targetUser.name,
            email: targetUser.email,
            password: "",
            confirmPassword: "",
            permissionLevel: targetUser.permissionLevel,

        }
    });

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

		// Usuario está tentando alterar o nivel de permissão dele mesmo
		if ((targetUser.id == user.id) && (targetUser.permissionLevel != permissionLevel)) {
			toast.error("Você não pode alterar seu próprio nível de permissão", toastConfig)
			return;
		}

        setOpen(false)

		toast.promise(
			async () => {
				return await axios.patch(`/api/user/handler?userId=${targetUser.id}`, { email, password, name, permissionLevel, selectedSupermarkets })
					.then((res) => {
						if (targetUser.id == user.id) {
							fetchData(user.id)
						}
	
						setUsers(res.data.users)
				})
			},
			{
				pending: "Atualizando usuário...",
				success: "Usuário atualizado com sucesso!",
				error: "Erro ao atualizar usuário"
			},
			toastConfig
		)
	}

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

	return (
		<div>
			<IconButton color="inherit" onClick={handleOpen}>

				<EditIcon />

			</IconButton>

			<Dialog open={open} onClose={handleClose}>

				<DialogTitle>Editando Usuário: {targetUser.name}</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>

						<TextField
							margin="dense"
							variant="standard"
							type="text"
							{...register("name", { required: "Insira o nome completo", })}
							error={Boolean(errors.name?.message)}
							helperText={errors.name?.message}
							label="Nome Completo"
							fullWidth
						/>

						<TextField
							margin="dense"
							variant="standard"
							type="email"
							{...register("email", { required: "Insira o email", })}
							error={Boolean(errors.email?.message)}
							helperText={errors.email?.message}
							label="Email"
							fullWidth
						/>

						{/* Seletor Supermercados */}

						<FormControlLabel
							sx={{ marginTop: '1rem' }}
							control={
								<Checkbox
									checked={editPassword}
									onChange={() => {
										setEditPassword(!editPassword);

										if (editPassword) {
											clearErrors(["password", "confirmPassword"])
										}
									}}
								/>
							}
							label="Deseja alterar a senha?"
						/>

						<TextField
							margin="dense"
							disabled={!editPassword}
							variant="standard"
							type="password"
							{...register("password", {
								validate: (value) => {
									if (editPassword) {

										if (!value) return "Insira a senha";

										if (value.length < 6) return "A senha deve ter pelo menos 6 caracteres";

									}
									
									return true;
								},
							})}
							error={Boolean(errors.password?.message)}
							helperText={errors.password?.message}
							label="Nova Senha"
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
							error={Boolean(errors.confirmPassword?.message)}
							helperText={errors.confirmPassword?.message}
							label="Confirme a Senha"
							fullWidth
						/>

						<FormControlLabel 
							sx={{ display: 'block', marginTop: '1rem', marginBottom: '1rem' }}
							control={
								<Checkbox 
									defaultChecked={targetUser.permissionLevel} 
									{...register("permissionLevel")}
								/>}
							
						label="Administrador" 
						/>

                        <Selector systemSupermarkets={systemSupermarkets} selectedSupermarkets={selectedSupermarkets} setSelectedSupermarkets={setSelectedSupermarkets} />

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

export default Edit;
