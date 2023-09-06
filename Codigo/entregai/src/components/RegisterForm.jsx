'use client'

import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import axios from "axios";

const RegisterForm = () => {

    const router = useRouter()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const submitData = async (data) => {
        const { fullname, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            // Display error message
            return;
        }

        await axios.post('/main/register/api', {email, password})
            .then((response) => {
                // Display sucess message (response contain the user data)
                router.push('/main')
            })
            .catch((error) => {
                // Display error message
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Cadastro</h1>
            
            <form onSubmit={handleSubmit(submitData)}>

                <TextField id="fullname" label="Nome Completo" type="text" {...register("fullname", { required: "Insira o nome completo" })} variant="outlined" />

                <TextField id="email" label="Email" type="email" {...register("email", { required: "Insira o email" })} variant="outlined" />

                <TextField id="password" label="Senha" type="password" {...register("password", { required: "Insira a senha" })} variant="outlined" />

                <TextField id="confirm-password" label="Confirmar Senha" type="password" {...register("confirmPassword", { required: "Repita a senha" })} variant="outlined" />

                <Button id="submit-button" type="submit" variant="contained" color="success">Cadastrar</Button>

            </form>
        </div>
    );
}

export default RegisterForm;