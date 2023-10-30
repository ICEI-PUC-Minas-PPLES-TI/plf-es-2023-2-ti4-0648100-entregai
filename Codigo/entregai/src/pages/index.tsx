import ClientLayout from "@/components/layout/ClientLayout";
import { Button, Paper, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Image from 'next/image'
import entregaiLogo from "/src/styles/img/entregai_logo_dark_blue.png";
import { ReactElement } from "react";
import styles from './index.module.scss';

const ClientMainPage = () => {
    return (
        <div className={styles.background}>
            <Image
                src={entregaiLogo}
                alt="Logo"
                width={500}
                className={styles.logo}
            />

            <Paper sx={{ boxShadow: 'none' }} className={styles.container}>
                <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', padding: '1rem' }}>
                    Seja bem-vindo(a)!
                </Typography>

                <Link href="/order">
                    <Button 
                        variant="contained" 
                        color="primary"
                        sx={{ margin: 0.5, width: 200 }}
                    >
                        Fazer Pedido</Button>
                </Link>

                <Link href="/track">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5, width: 200 }}
                    >
                        Acompanhar Pedido
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
        </div>
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