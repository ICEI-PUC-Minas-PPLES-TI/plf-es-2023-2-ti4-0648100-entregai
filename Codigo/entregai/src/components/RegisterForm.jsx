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
            cpf: "",
            password: "",
            confirmPassword: ""
        }
    });

    const submitData = async (data) => {
        const { fullname, cpf, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            // Display error message
            return;
        }

        const email = cpf + "@user.com";

        await axios.post('/register/api', {email, password})
            .then((response) => {
                // Display sucess message (response contain the user data)
                router.push('/home')
            })
            .catch((error) => {
                // Display error message
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit(submitData)}>

            <TextField id="fullname" label="Nome Completo" type="text" {...register("fullname", { required: "Insira o nome completo" })} variant="outlined" />

            <TextField id="cpf" label="CPF" type="text" {...register("cpf", { required: "Insira o CPF", maxLength: 11 })} variant="outlined" />

            <TextField id="password" label="Senha" type="password" {...register("password", { required: "Insira a senha" })} variant="outlined" />

            <TextField id="confirm-password" label="Confirmar Senha" type="password" {...register("confirmPassword", { required: "Repita a senha" })} variant="outlined" />

            <Button id="submit-button" type="submit" variant="contained" color="success">Cadastrar</Button>

        </form>
    );
}

export default RegisterForm;