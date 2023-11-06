import { ArrowForwardIos } from "@mui/icons-material"
import { Button, IconButton, TextField } from "@mui/material"

const Tracker = () => {
    return (
        <div>
            <TextField
                id="orderCode"
                label="Código do pedido"
                variant="outlined"
                size="small"
                sx={{ mb: 2, marginRight: '1rem', height: '2.5rem' }}
            />

            <Button
                variant="contained"
                sx={{ height: '2.5rem' }}
            >
                Buscar
                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                >
                    <ArrowForwardIos />
                </IconButton>
            </Button>
        </div>
    )
}

export default Tracker