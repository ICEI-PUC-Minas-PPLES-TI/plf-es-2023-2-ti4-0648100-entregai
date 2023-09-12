'use client'

import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import axios from "axios";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../app/theme';


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
        const { fullname, email, password, confirmPassword, permission } = data;

        if (password !== confirmPassword) {
            // Display error message
            return;
        }

        await axios.post('/main/register/api', {fullname, permission, email, password})
            .then((response) => {
                router.push('/main')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="registerForm">
                <h1>Cadastro</h1>
                
                <form onSubmit={handleSubmit(submitData)}>

                    <TextField id="fullname" label="Nome Completo" type="text" {...register("fullname", { required: "Insira o nome completo" })} variant="outlined" />

                    <TextField id="email" label="Email" type="email" {...register("email", { required: "Insira o email" })} variant="outlined" />

                    <TextField id="password" label="Senha" type="password" {...register("password", { required: "Insira a senha" })} variant="outlined" />

                    <TextField id="confirm-password" label="Confirmar Senha" type="password" {...register("confirmPassword", { required: "Repita a senha" })} variant="outlined" />

                    <FormControlLabel control={<Checkbox {...register("permission")} />} label="Administrador ?" />

                    <Button id="submit-button" type="submit" variant="contained" color="secondary">Cadastrar</Button>

                </form>
            </div>
        </ThemeProvider>
        
    );
}

export default RegisterForm;