import { Supermarket } from "@/libs/types/Supermarket"
import Picture from "./Picture"
import { Box, Grid, ThemeProvider, Typography } from "@mui/material"
import theme from "@/libs/theme/theme"

const Info = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0 1.5rem 0' }}>
                    {supermarket.name}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Picture imageUrl={supermarket.imageUrl!} />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body1" noWrap component="body">
                                <Typography variant="button" sx={{ color: 'primary.dark' }}>Endereço: </Typography>
                                {supermarket.address}
                            </Typography>

                            <Typography variant="body1" noWrap component="body">
                                <Typography variant="button" sx={{ color: 'primary.dark' }}>Telefone: </Typography>
                                {supermarket.phone}
                            </Typography>

                            <Typography variant="body1" noWrap component="body">
                                <Typography variant="button" sx={{ color: 'primary.dark' }}>CNPJ: </Typography>
                                {supermarket.cnpj}
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>



            </div>
        </ThemeProvider>
    )
}

export default Info