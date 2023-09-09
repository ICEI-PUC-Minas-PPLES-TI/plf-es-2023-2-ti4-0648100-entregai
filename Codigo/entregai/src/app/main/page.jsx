'use client'

import { auth } from "@/firebase/Init";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Page() {

    const [user] = useAuthState(auth);
    const { push } = useRouter();

    const userSignOut = () => {
        signOut(auth).then(() => { push("/") })
    }

    return (
        <main>
    
            <h1>Bem-vindo! {user && (user.email)}</h1>

            <Button id="deslogar" color="error" variant="contained" onClick={userSignOut}>Deslogar</Button>

            <Link href="/main/register"><Button variant="contained" color="primary">Cadastrar Usuario</Button></Link>

        </main>
    )
}


