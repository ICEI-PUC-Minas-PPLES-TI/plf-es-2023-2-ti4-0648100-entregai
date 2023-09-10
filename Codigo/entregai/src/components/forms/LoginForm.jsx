"use client";

import { auth } from "@/firebase/firebase";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
	const { push } = useRouter();
	const [snackbar, setSnackbar] = useState({open: false, type: "success", message: ""});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbar({open: false})
	};

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submitData = async (data) => {
		const { email, password } = data;

		await signInWithEmailAndPassword(auth, email, password)
			.then(() => {
                setSnackbar({open: true, type: "success", message: "Logado com sucesso!"});
				push("/main");
			})
			.catch(() => {
                setSnackbar({open: true, type: "error", message: "Credenciais invalidas!"})
			});
	};

	return (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleSubmit(submitData)}>
				<TextField id="outlined-basic" label="Email" type="email" {...register("email")} variant="outlined" />

				<TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" />

				<Button type="submit" variant="contained" color="success">
					Logar
				</Button>

                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity={snackbar.type} sx={{ width: "100%" }}>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</form>
		</div>
	);
};

export default LoginForm;
