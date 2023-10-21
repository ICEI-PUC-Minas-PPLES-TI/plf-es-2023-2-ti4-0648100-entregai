import { Product } from "@/libs/types/Product"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Supermarket } from "@/libs/types/Supermarket";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

type FormDataType = {
    name: string,
    price: number,
    stockQuantity: number
    soldQuantity: number | undefined
}

const Edit = ({ setSupermarketDetails, supermarket, product }: { setSupermarketDetails: Function, supermarket: Supermarket, product: Product }) => {

    const [ open, setOpen ] = useState(false)

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: product.name,
            price: product.price,
            stockQuantity: product.stockQuantity,
            soldQuantity: product.soldQuantity
        }
    });

    function submitData(data: FormDataType) {
        const { name, price, stockQuantity, soldQuantity } = data;

        setOpen(false)

		toast.promise(
			async () => {
				await axios.patch(`/api/product/handler?supermarketId=${supermarket.id}&productId=${product.id}`, { name, price, stockQuantity, soldQuantity })
					.then((res) => {
						setSupermarketDetails(res.data.supermarket)
					})
			},
			{
				pending: "Atualizando produto...",
				success: "Produto atualizado com sucesso!",
				error: "Erro ao atualizar produto"
			},
			toastConfig
		)
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>

            <IconButton color="inherit" onClick={handleOpen}>

                <EditIcon />

            </IconButton>

            <Dialog open={open} onClose={handleClose}>

				<DialogTitle>Editando Item: {product.name}</DialogTitle>

				<form onSubmit={handleSubmit(submitData)}>

					<DialogContent>

					<TextField 
                            margin="dense" 
                            variant="standard" 
                            {...register("name", { 
                                required: "Insira o nome do item",
                            })}
                            error={Boolean(errors.name?.message)}
							helperText={errors.name?.message}
                            label="Nome" 
                            fullWidth 
                        />

						<TextField 
                            margin="dense" 
                            variant="standard" 
                            {...register("price", { 
                                required: "Insira o preço do item",
                                validate: (value) => {
                                    if (!/^[0-9]+(\.[0-9]{2,})?$/.test(String(value))) {
                                        return "Insira um valor numérico positivo com pelo menos duas casas decimais"
                                    }
                                    return true
                                }
                            })}
                            error={Boolean(errors.price?.message)}
							helperText={errors.price?.message}
                            label="Preço" 
                            fullWidth 
                        />

						<TextField 
                            margin="dense" 
                            variant="standard" 
                            {...register("stockQuantity", { 
                                required: "Insira a quantidade em estoque do item",
                                validate: (value) => {
                                    if (!/^[1-9]\d*$/.test(String(value))) {
                                        return "Insira um valor numérico positivo não decimal e diferente de zero"
                                    }
                                    return true
                                }
                            })}
                            error={Boolean(errors.stockQuantity?.message)}
							helperText={errors.stockQuantity?.message}
                            label="Quantidade em Estoque" 
                            fullWidth 
                        />

                        <input type="hidden" {...register("soldQuantity")} />

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