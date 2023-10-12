import { auth } from "@/libs/firebase/firebase-config";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { setCookie } from "cookies-next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

		await signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => { 

				const token = await userCredential.user.getIdToken()

				const res = await axios.post('/api/login/auth', { token })

				setCookie('session', res.data.sessionCookie)

				router.push("/app/user")
			})
			.catch((err: any) => {
				alert(err.message)
			})
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
    )
}

export default Form