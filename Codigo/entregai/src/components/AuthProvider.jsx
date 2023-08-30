import { auth } from "@/firebase/Init"
import { Button } from "@mui/material"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"

const AuthProvider = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => listen()
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Deslogado com sucesso");
        }).catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <div>
            {authUser ? <div><p>Logado, Bem-vindo {authUser.email}</p> <Button id="deslogar" color="error" variant="contained" onClick={userSignOut}>Deslogar</Button></div> : <p>Não logado</p>}
        </div>
    )
}

export default AuthProvider