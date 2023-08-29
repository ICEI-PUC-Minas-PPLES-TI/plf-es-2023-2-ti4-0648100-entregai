'use client'

import { TextField, Button } from '@mui/material'
import Link from 'next/link'
import styles from './Form.module.scss'

const LoginForm = () => {
    return (
        <div className={styles.form}>

            <TextField id="outlined-basic" label="ID" type="email" variant="outlined" />

            <TextField id="outlined-basic" label="Senha" type="password" variant="outlined" />

            <Button variant="contained" color="error">Logar</Button>

            <Link href="/register">
                <Button variant="contained" color="primary">Cadastrar</Button>
            </Link>

        </div>
    )
}

export default LoginForm
