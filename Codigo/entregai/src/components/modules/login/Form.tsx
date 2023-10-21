import { auth } from "@/libs/firebase/firebase-config";
import { Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { setCookie } from "cookies-next";
import Image from 'next/image';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import theme from "@/libs/theme/theme";
import styles from './Form.module.scss';
import loginCoverImage from "../../../styles/img/login_cover.png";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

interface FormDataType {
	email: string,
	password: string,
}

const Form = () => {

	const router = useRouter();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submitData = async (data: FormDataType) => {
		const { email, password } = data;

		toast.promise(
			async () => {
				return await signInWithEmailAndPassword(auth, email, password)
					.then(async (userCredential) => {
	
					const token = await userCredential.user.getIdToken()
	
					const res = await axios.post('/api/login/auth', { token })
	
					setCookie('session', res.data.sessionCookie)
	
					router.push("/app/supermarket")
				})
			},
			{
				pending: 'Carregando...',
				success: 'Logado com sucesso!',
				error: 'Erro ao logar!',
			},
			toastConfig
		)
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.container} >
				<Grid container spacing={2} className={styles.box}>
					<Grid item xs={6}>
						<div className={styles.formContainer}>
							<Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', padding: '1rem' }}>
								Login
							</Typography>

							<form onSubmit={handleSubmit(submitData)} className={styles.form}>

								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											id="outlined-basic"
											label="Email"
											type="email" {...register("email")}
											variant="outlined"
											className={styles.label}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											id="outlined-basic"
											label="Senha"
											type="password" {...register("password")}
											variant="outlined"
											className={styles.label}
										/>
									</Grid>

									<Grid item xs={12}>
										<Button
											type="submit"
											variant="contained"
											id="submit"
											className={styles.button}
											sx={{
												backgroundColor: 'secondary.main',
												color: 'secondary.contrastText',
												'&:hover': {
													backgroundColor: 'secondary.dark',
												},
											}}
										>
											Logar
										</Button>
									</Grid>
								</Grid>
							</form>
						</div>
					</Grid>

					<Grid item xs={6}>
						<div className={styles.imageContainer}>
							<Image src={loginCoverImage} alt="Some text" />
						</div>
					</Grid>
				</Grid>
			</div>
		</ThemeProvider>
	)
}

export default Form