import { Product } from "@/libs/types/Product"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Supermarket } from "@/libs/types/Supermarket";

type FormDataType = {
    name: string,
    price: number,
    stockQuantity: number
}

const Edit = ({ supermarket, product }: { supermarket: Supermarket, product: Product }) => {

    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: product.name,
            price: product.price,
            stockQuantity: product.stockQuantity
        }
    });

    async function submitData(data: FormDataType) {
        const { name, price, stockQuantity } = data;

        // Exibir erro
        if (Object.keys(errors).length > 0) {
            return;
        }

        setOpen(false)

        await axios.patch(`/api/product/handler?supermarketId=${supermarket.id}&productId=${product.id}`, { name, price, stockQuantity })
            .then((res) => {
                if (res.status == 200) {
                    router.refresh()
                }
            })
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            <IconButton color="inherit" onClick={handleOpen}>

                <SettingsIcon />

            </IconButton>

            <Dialog open={open} onClose={handleClose}>

				<DialogTitle>Editando Item: {product.name}</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>

						<TextField
							margin="dense"
							variant="standard"
							type="text"
							{...register("name", {
								required: "Insira o nome do item",
							})}
							helperText={errors.name?.message}
							label="Nome do Item"
							fullWidth
						/>

                        <TextField
							margin="dense"
							variant="standard"
							type="text"
							{...register("price", {
								required: "Insira o preço do item",
							})}
							helperText={errors.name?.message}
							label="Preço"
							fullWidth
						/>

                        <TextField
							margin="dense"
							variant="standard"
							type="text"
							{...register("stockQuantity", {
								required: "Insira a quantidade em estoque",
							})}
							helperText={errors.name?.message}
							label="Quantidade em estoque"
							fullWidth
						/>

					</DialogContent>

					<DialogActions>

						<Button onClick={handleClose}>Cancelar</Button>
                        
						<Button type="submit">Atualizar</Button>

					</DialogActions>
				</form>
			</Dialog>

        </div>
    )
}

export default Edit