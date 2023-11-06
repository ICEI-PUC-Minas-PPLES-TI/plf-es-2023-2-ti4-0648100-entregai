import BackButton from "@/components/misc/BackButton"
import Tracker from "@/components/modules/track/Tracker"
<<<<<<< Updated upstream
import { Box, Typography } from "@mui/material"
=======
import { Typography } from "@mui/material"
>>>>>>> Stashed changes

const Tracking = () => {
    return (
        <Box sx={{ padding: '1.5rem' }}>
            <BackButton />

<<<<<<< Updated upstream
            <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', margin: '1.5rem 0'}}>
                Acompanhar pedido
            </Typography>

            <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', margin: '0.5rem 0'}}>
                Digite abaixo o código do pedido:
=======
            <Typography variant="h4" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                Rastrear Pedido
>>>>>>> Stashed changes
            </Typography>

            <Typography variant="body1" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                Digite o código do seu pedido para rastreá-lo
            </Typography>
        
            <Tracker />
        </Box>
    )
}

export default Tracking