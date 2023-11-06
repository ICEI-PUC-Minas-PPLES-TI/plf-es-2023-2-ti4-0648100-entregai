import BackButton from "@/components/misc/BackButton"
import Tracker from "@/components/modules/track/Tracker"
import { Box, Typography } from "@mui/material"

const Tracking = () => {
    return (
        <Box sx={{ padding: '1.5rem' }}>
            <BackButton />

            <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', margin: '1.5rem 0'}}>
                Acompanhar pedido
            </Typography>

            <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', margin: '0.5rem 0'}}>
                Digite abaixo o código do pedido:
            </Typography>

            <Tracker />
        </Box>
    )
}

export default Tracking