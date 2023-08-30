'use client'

import { auth } from "@/firebase/Init"
import { Button, TextField } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"

const LoginForm = () => {

    const { register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const submitData = async (data) => {
        const { email, password } = data
        
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)

        console.log(userCredentials);
    }

    return (
        
        <form onSubmit={handleSubmit(submitData)}>

            <TextField id="outlined-basic" label="Email" type="email" {...register("email")} variant="outlined" />

            <TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" />

            <Button type="submit" variant="contained" color="success">Logar</Button>

        </form>
    )
}

export default LoginForm