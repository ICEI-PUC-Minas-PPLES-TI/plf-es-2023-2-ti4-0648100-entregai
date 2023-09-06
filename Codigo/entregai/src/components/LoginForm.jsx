'use client'

import { auth } from "@/firebase/Init"
import { Button, TextField } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"

const LoginForm = () => {

    const router = useRouter()
    const [user, loading] = useAuthState(auth);

    const { register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const submitData = async (data) => {
        const { email, password } = data
        
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Display sucess message (or not)
                router.push('/main')
            })
            .catch((error) => {
                // Display error message on tooltip or card
            });
    }

    if (user || loading) { 
        if (user) router.push('/main');
        return <></>
    }

    return (
        <div>

            <h1>Login</h1>
            
            <form onSubmit={handleSubmit(submitData)}>

                <TextField id="outlined-basic" label="Email" type="email" {...register("email")} variant="outlined" />

                <TextField id="outlined-basic" label="Senha" type="password" {...register("password")} variant="outlined" />

                <Button type="submit" variant="contained" color="success">Logar</Button>

            </form>
            
        </div>
    )
}

export default LoginForm