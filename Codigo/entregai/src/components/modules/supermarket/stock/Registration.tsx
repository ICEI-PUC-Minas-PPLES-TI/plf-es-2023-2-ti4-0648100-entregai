import toastConfig from "@/libs/toast/toastConfig";
import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormDataType = {
    name: string;
    price: string;
    stockQuantity: string;
}

const Registration = ({ supermarket, setSupermarketDetails }: { supermarket: Supermarket, setSupermarketDetails: Function }) => {

    const [ open, setOpen ] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            price: "",
            stockQuantity: ""
        }
    })

    function submitData(data: FormDataType) {
        const { name, price, stockQuantity } = data

        setOpen(false)

        toast.promise(
            async () => {
                return await axios.post(`/api/product/handler?supermarketId=${supermarket.id}`, { name, price, stockQuantity })
                    .then((res) => {
                        setSupermarketDetails(res.data.supermarket)
                    })
            },
            {
                pending: "Inserindo produto...",
                success: "Produto inserido com sucesso!",
                error: "Erro ao inserir produto"
            },
            toastConfig
        )
    }

    function handleOpen() { setOpen(true) }

    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
				Novo Produto
			</Button>

			<Dialog open={open} onClose={handleClose}>

				<DialogTitle>Inserir Novo Produto</DialogTitle>

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
                                    if (!/^[0-9]+(\.[0-9]{2,})?$/.test(value)) {
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
                                    if (!/^[1-9]\d*$/.test(value)) {
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