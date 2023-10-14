import { Button, TextField } from "@mui/material"

const Tracker = () => {
    return (
        <div>
            <TextField 
                id="orderCode" 
                label="Código da Encomenda" 
                variant="outlined"
                size="small" 
                sx={{ mb: 2 }}
            />

            <Button variant="contained">Buscar</Button>
        </div>
    )
}

export default Tracker