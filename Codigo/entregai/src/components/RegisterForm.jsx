'use client'

import { auth } from "@/firebase/Init";
import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

const RegisterForm = () => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: "",
            password: ""
        }
    });

    const submitData = async (data) => {
        const { email, password } = data;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        console.log(userCredentials);
    }

    return (
        <form onSubmit={handleSubmit(submitData)}>

            <TextField id="outlined-basic" label="Email" type="email" {...register("email")} variant="outlined" />

            <TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" />

            <Button type="submit" variant="contained" color="success">Cadastrar</Button>

        </form>
    );
}

export default RegisterForm;