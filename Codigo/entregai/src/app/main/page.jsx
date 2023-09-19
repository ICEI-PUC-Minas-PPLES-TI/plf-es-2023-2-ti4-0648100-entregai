'use client'

import { useUserData } from "@/components/context/UserDataContext"
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Page() {

    const { userData } = useUserData()

    const [supermarkets, setSupermarkets] = useState([])

    const [open, setOpen] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            nome: "",
            endereco: "",
            telefone: "",
            cnpj: ""
        }
    })

    const fetchSupermarkets = () => {
        axios.get('/main/supermarket/api')
            .then((response) => {
                setSupermarkets(response.data.supermarkets)
            })
    }

    useEffect(() => {
        fetchSupermarkets()
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const submitData = async (data) => {
        const { name, address, phone, cnpj } = data

        // Backdrop aqui

        axios.post('/main/supermarket/api', {name, address, phone, cnpj})
            .then((response) => {
                if (response.status == 200) {
                    fetchSupermarkets()
                    setOpen(false)
                }
            })
    }

    return (
        <main>
            <h1>Bem-vindo!</h1>
            
            {userData.permission == 1 && <div>
                
                <Button variant="outlined" onClick={handleOpen}>Cadastrar Supermercado</Button>

                <Dialog open={open} onClose={handleClose}>
                    
                    <DialogTitle>Cadastrar Novo Supermercado</DialogTitle>

                    <form onSubmit={handleSubmit(submitData)}>

                        <DialogContent>

                            <TextField margin="dense" variant="standard" {...register("name")} label="Nome" fullWidth/>

                            <TextField margin="dense" variant="standard" {...register("address")} label="Endereço" fullWidth/>

                            <TextField margin="dense" variant="standard" {...register("phone")} label="Telefone" fullWidth/>

                            <TextField margin="dense" variant="standard" {...register("cnpj")} label="CNPJ" fullWidth/>

                        </DialogContent>

                        <DialogActions>

                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleClose} type="submit">Cadastrar</Button>

                        </DialogActions>

                    </form>
                </Dialog>

                <h2>Supermercados</h2>

                <div>
                    {supermarkets.map((supermarket) => (
                        <Card key={supermarket.cnpj} sx={{ maxWidth: 200 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {supermarket.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {supermarket.address}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Ver mais</Button>
                            </CardActions>
                        </Card>
                        // <div key={supermarket.id}>
                        //     <h3>{supermarket.name}</h3>
                        //     <p>{supermarket.address}</p>
                        //     <p>{supermarket.phone}</p>
                        //     <p>{supermarket.cnpj}</p>
                        // </div>
                    ))}
                </div>
            </div>}

            
        </main>
    )
}


