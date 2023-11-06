import { useAuth } from "@/components/context/UserContext"
import { Typography } from "@mui/material"

const Info = () => {

    const { user } = useAuth()

    return (
        <div>
            <Typography variant="h3">Perfil</Typography>

            <hr></hr>

            <Typography variant="h5">Olá {user.name}</Typography>

            <Typography variant="body1">Email: {user.email}</Typography>

            <Typography variant="body1">Nível de Permissão: {user.permissionLevel ? "ADMINISTRADOR" : "USUÁRIO"}</Typography>

            <Typography variant="body1">ID: #{user.id}</Typography>
        </div>
    )
}

export default Info