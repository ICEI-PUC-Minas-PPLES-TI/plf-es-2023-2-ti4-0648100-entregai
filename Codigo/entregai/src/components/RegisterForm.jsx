'use client'

import { TextField, Button } from '@mui/material'
import styles from './Form.module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const RegisterForm = () => {

    const form = useForm({
        defaultValues: {
            email: "123",
            password: "123"
        }
    })

    const { register, handleSubmit} = form

    const onSubmit = (data) => {
        axios.post('/api', data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <TextField id="outlined-basic" label="ID" type="email" {...register("email")} variant="outlined" />

            <TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" />

            <Button type="submit" variant="contained" color="success">Cadastrar</Button>

        </form>
    )
}

export default RegisterForm
