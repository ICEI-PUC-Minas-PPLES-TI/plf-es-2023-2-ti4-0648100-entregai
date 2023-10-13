import BackButton from "@/components/misc/BackButton"
import { Button, TextField } from "@mui/material"

const Tracking = () => {
    return (
        <div>
            <BackButton />

            <h1>Acompanhar Encomenda</h1>
        
            <p>Por favor, digite o código do seu pedido</p>

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

export default Tracking