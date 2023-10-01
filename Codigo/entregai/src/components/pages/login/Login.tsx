'use client'

import { auth } from "@/lib/firebase/firebase-config";
import { Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginFormData {
	email: string,
	password: string,
}

const Login = () => {

	const { push } = useRouter();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submitData = async (data: LoginFormData) => {
		const { email, password } = data;

		await signInWithEmailAndPassword(auth, email, password)
			.then(() => { push("/main/supermarket") })
	};


	return (
		<div className="container">

			<form onSubmit={handleSubmit(submitData)} className="form">

				<h1>Login</h1>

				<TextField id="outlined-basic" label="Email" type="email" {...register("email")} variant="outlined" className="box"/>

				<TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" className="box"/>

				<Button type="submit" variant="contained" color="success" id="submit">Logar</Button>

			</form>
			
			<div className="side"></div>
		</div>
	);
};

export default Login;
