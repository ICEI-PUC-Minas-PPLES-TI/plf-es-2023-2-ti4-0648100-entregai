import ClientLayout from "@/components/layout/ClientLayout";
import { Box, Button, Paper, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Image from 'next/image'
import entregaiLogo from "/src/styles/img/entregai_logo_white_shadow.png";
import { ReactElement } from "react";
import styles from './index.module.scss';
import coverImage from '/src/styles/img/index_cover.jpg'

const ClientMainPage = () => {
    return (
        <Box className={styles.background} 
            sx={{ background: `url(${coverImage.src}) center / cover`, width: '100%', height: '100vh' }} 
        >
            <Image
                src={entregaiLogo}
                alt="Logo"
                width={500}
                className={styles.logo}
            />

            <Paper className={styles.container}>
                <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', padding: '0.5rem' }}>
                    Seja bem-vindo(a)!
                </Typography>

                <Link href="/order">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5, width: 200 }}
                    >
                        Fazer pedido</Button>
                </Link>

                <Link href="/track">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5, width: 200 }}
                    >
                        Acompanhar pedido
                    </Button>
                </Link>
            </Paper>

            <footer className={styles.footer}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', height: 25 }}>
                    <Button color="inherit">
                        <Link href="/login">Área do supermercado</Link>
                    </Button>
                </Toolbar>
            </footer>
        </Box>
    )
}

ClientMainPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <ClientLayout>

            {page}

        </ClientLayout>
    )
}

export default ClientMainPage