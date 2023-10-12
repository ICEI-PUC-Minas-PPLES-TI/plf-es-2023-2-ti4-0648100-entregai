import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormDataType = {
    name: string;
    price: number | null;
    stockQuantity: number | null;
}

const Registration = ({ supermarket }: { supermarket: Supermarket }) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            price: null,
            stockQuantity: null
        }
    })

    async function submitData(data: FormDataType) {
        const { name, price, stockQuantity } = data

        setOpen(false)

        await axios.post(`/api/product/handler?supermarketId=${supermarket.id}`, { name, price, stockQuantity })
            .then((res) => {
                if (res.status == 200) {
                    router.refresh()
                } else {
                    // Produto não pode ser inserido
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="contained" color="yellow" onClick={handleOpen}>
				Novo Produto
			</Button>

			<Dialog open={open} onClose={handleClose}>

				<DialogTitle>Inserir Novo Produto</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>

                        {/* 
                        
                        Validar campos com numeros
                        
                        Nome, Preço, Quantidade em Estoque, Quantidade Vendida, Lucro Total */}

						<TextField margin="dense" variant="standard" {...register("name")} label="Nome" fullWidth />

						<TextField margin="dense" variant="standard" {...register("price")} label="Preço" fullWidth />

						<TextField margin="dense" variant="standard" {...register("stockQuantity")} label="Quantidade em Estoque" fullWidth />
					
                    </DialogContent>

					<DialogActions>

						<Button onClick={handleClose}>Cancelar</Button>

						<Button type="submit">Inserir</Button>

					</DialogActions>

				</form>

			</Dialog>
        </div>
    )
}

export default Registration