import { Supermarket } from "@/libs/types/Supermarket"
import Picture from "./Picture"
import { Box, Grid, ThemeProvider, Typography } from "@mui/material"
import theme from "@/libs/theme/theme"
import styles from './Info.module.scss'

const Info = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                {supermarket.name}
            </Typography>

            <Box position="relative">
                <div className={styles.pictureContainer}>
                    <div className={styles.blurredContent}></div>
                    <Picture imageUrl={supermarket.imageUrl!} />
                </div>

                <div className={styles.overlayContent}>
                    <Typography variant="body1" noWrap component="body" sx={{ color: 'white' }}>
                        <Typography variant="button" sx={{ color: 'white' }}>Endereço: </Typography>
                        {supermarket.address}
                    </Typography>

                    <Typography variant="body1" noWrap component="body" sx={{ color: 'white' }}>
                        <Typography variant="button" sx={{ color: 'white' }}>Telefone: </Typography>
                        {supermarket.phone}
                    </Typography>

                    <Typography variant="body1" noWrap component="body" sx={{ color: 'white' }}>
                        <Typography variant="button" sx={{ color: 'white' }}>CNPJ: </Typography>
                        {supermarket.cnpj}
                    </Typography>
                </div>
            </Box>

        </ThemeProvider>
    );
}

export default Info