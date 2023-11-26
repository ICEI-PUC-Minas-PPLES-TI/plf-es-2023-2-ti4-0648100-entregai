import { useAuth } from "@/components/context/UserContext"
import { Box, Typography } from "@mui/material"
import userImage from "/src/styles/img/user_3d.png"
import Image from "next/image"
import styles from './Info.module.scss'

const Info = () => {

    const { user } = useAuth()

    return (
        <div>
            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                Meu perfil
            </Typography>

            <Box sx={{ padding: '1rem 0' }}>

                <div className={styles.container}>
                    <Image src={userImage} alt="User Icon" className={styles.userIcon} />

                    <Box sx={{ padding: '1.5rem' }}>
                        <Typography variant="body1" noWrap component="body">
                            <Typography variant="button" sx={{ color: 'primary.dark' }}>Nome: </Typography>
                            {user.name}
                        </Typography>

                        <Typography variant="body1" noWrap component="body">
                            <Typography variant="button" sx={{ color: 'primary.dark' }}>Email: </Typography>
                            {user.email}
                        </Typography>

                        <Typography variant="body1" noWrap component="body">
                            <Typography variant="button" sx={{ color: 'primary.dark' }}>Nível de permissão: </Typography>
                            {user.permissionLevel ? "Administrador" : "Usuário"}
                        </Typography>

                        <Typography variant="body1" noWrap component="body">
                            <Typography variant="button" sx={{ color: 'primary.dark' }}>ID: </Typography>
                            #{user.id}
                        </Typography>
                    </Box>
                </div>
            </Box>
        </div>
    )
}

export default Info