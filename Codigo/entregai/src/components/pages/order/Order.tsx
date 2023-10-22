import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";
import { Box, Button, Checkbox, FormControl, FormHelperText, IconButton, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Product } from "@/libs/types/Product";
import { Item } from "@/libs/types/Item";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MAX_NUMBER_OF_STEPS = 2

type FormDataType = {
    paymentMethod: string,
    name: string,
    phone: string,
    address: string,
}


const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const [step, setStep] = useState(0)

    const [ completed, setCompleted ] = useState<boolean>(false)

    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');

    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    
    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    const { register, getValues, reset, trigger, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            paymentMethod: "",
            name: "",
            phone: "",
            address: "",
        }
    })

    const ItemStep = () => {
        
        function handleSupermarket(event: SelectChangeEvent) {
            setSelectedSupermarketId(event.target.value);
            setSelectedItems([]);
        };

        function handleCheckbox(itemId: string) {

            if (selectedItems.some((selectedItem: Item) => selectedItem.productId === itemId)) {
                
                setSelectedItems(selectedItems.filter((includedItem) => includedItem.productId !== itemId));
            
            } else {

                const newItem : Item = { productId: itemId, quantity: 1 }
                
                setSelectedItems([...selectedItems, newItem]);
            }
        }

        function handleTextField(itemId: string, event: ChangeEvent) {
            // update the "quantity" field of the Item in the selectedItems array that corresponds to the itemId
            var newQuantity = parseInt((event.target as HTMLInputElement).value);

            if (isNaN(newQuantity)) {
                newQuantity = 0
            }

            const newItem : Item = { productId: itemId, quantity: newQuantity }

            const newSelectedItems = selectedItems.map((item) => {
                if (item.productId === newItem.productId) {
                    return newItem;
                }
                return item;
            });

            setSelectedItems(newSelectedItems);
        }

        return (
            <div>
                <p>Por favor, selecione o supermercado na sua região</p>

                <FormControl sx={{ width: 150 }}>
                    
                    <InputLabel id="supermarketSelectLabel">Supermercados</InputLabel>
                    
                    <Select
                        labelId="supermarketSelectLabel"
                        id="supermarketSelect" 
                        value={selectedSupermarketId} 
                        onChange={handleSupermarket}
                        label="Supermercados"
                        required
                    >
                        {systemSupermarkets.map((sup: Supermarket) => (
                            <MenuItem key={sup.id} value={sup.id}>
                                <ListItemText primary={sup.name} />
                            </MenuItem>
                        ))}
                    
                    </Select>

                </FormControl>

                <p>Por favor, selecione os itens que deseja encomendar</p>

                {selectedSupermarket?.stock?.map((item: Product) => (

                    <div key={item.id}>

                        <Checkbox 
                            checked={selectedItems.some((selectedItem: Item) => selectedItem.productId === item.id)} 
                            onChange={() => handleCheckbox(item.id)}
                        />

                        <TextField
                            onChange={(event) => handleTextField(item.id, event)}
                            value={selectedItems.find((selectedItem: Item) => selectedItem.productId === item.id)?.quantity}
                            disabled={!selectedItems.some((selectedItem: Item) => selectedItem.productId === item.id)}
                            variant="outlined"
                            size="small"
                            sx={{ width: 70 }}
                        />

                        {item.stockQuantity == 0 ? item.name + " (Indisponível)" : item.name}

                    </div>
                ))}
            </div>
        )
    }

    const BuyerStep = () => {

        return (
            <div>

                <TextField
                    label="Nome"
                    {...register("name", { required: "Insira o seu nome" })}
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    variant="outlined"
                />

                <TextField
                    variant="outlined"
                    {...register("phone", {
                        required: "Insira o telefone",
                        pattern: {
                            value: /^\d+$/,
                            message: "Insira apenas números"
                        }
                    })}
                    error={Boolean(errors.phone?.message)}
                    helperText={errors.phone?.message}
                    label="Telefone"
                />

                <TextField 
                    label="Endereço" 
                    {...register("address", { required: "Insira o seu endereço" })} 
                    error={Boolean(errors.address?.message)}
                    helperText={errors.address?.message}
                    variant="outlined" 
                />

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth error={Boolean(errors.paymentMethod?.message)}>
                        <InputLabel id="selectLabel">Forma de Pagamento</InputLabel>
                        <Controller
                            name="paymentMethod"
                            control={control}
                            rules={{ required: 'Escolha a forma de pagamento' }}
                            render={({ field: { onChange, value} }) => (
                                <Select 
                                    value={value}
                                    onChange={onChange}
                                    label="Forma de Pagamento" 
                                    labelId="selectLabel"
                                >
                                    <MenuItem value={"Credito"}>Credito</MenuItem>
                                    <MenuItem value={"Debito"}>Debito</MenuItem>
                                    <MenuItem value={"Dinheiro"}>Dinheiro</MenuItem>
                                </Select>
                            )}
                            defaultValue=""
                        />
                        {errors.paymentMethod?.message && <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>}
                    </FormControl>
                </Box>

                {/* Input de forma de pagamento: Credito, Debito ou Dinheiro */}

            </div>
        )
    }

    const ConfirmationStep = () => {

        const selectedProducts = selectedItems.map((item) => {
            const product = selectedSupermarket?.stock?.find((stockItem) => stockItem.id === item.productId) as Product;
            return { id: product.id, itemName: product.name, price: product.price, quantity: item.quantity };
        })
        
        return (
            <div>

                <p>Por favor, confirme os dados da sua encomenda</p>

                <h3>Supermercado:</h3>

                <p>{selectedSupermarket?.name}</p>

                <h3>Itens:</h3>

                <table>
                    <tr>
                        <th>Item</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Sub-Total</th>
                    </tr>
                    {selectedProducts.map((selectedProduct) => (
                    <tr key={selectedProduct.id}>
                        <td>{selectedProduct.itemName}</td>
                        <td>{selectedProduct.price}</td>
                        <td>{selectedProduct.quantity}</td>
                        <td>{selectedProduct.quantity * selectedProduct.price}</td>
                    </tr>
                    ))}
                </table>

                <h3>Dados</h3>

                <p>Nome: {getValues("name")}</p>

                <p>Telefone: {getValues("phone")}</p>

                <p>Endereço: {getValues("address")}</p>

                <p>Forma de Pagamento: {getValues("paymentMethod")}</p>

                <Button onClick={handleSubmit(submitData)} variant="contained">Fazer Encomenda</Button>
            </div>
        )
    }

    const Completed = () => {
            
        return (
            <div>
                <h3>Encomenda feita com sucesso!</h3>

                <CheckCircleIcon />

                <p>Seu pedido será entregue em breve.</p>

                <Button onClick={() => { 
                    setCompleted(false)
                    setStep(0)
                    setSelectedSupermarketId('')
                    setSelectedItems([])
                    reset()
                }} 
                variant="contained">Fazer outra encomenda</Button>
            </div>
        )
    }

    const Arrows = () => {

        async function handleFowardStep() {

            const valid = await validateStep()
    
            if (valid && step < MAX_NUMBER_OF_STEPS) {
                setStep((prev) => prev + 1)
            }
        }
    
        function handleBackwardsStep() {
            if (step > 0) {
                setStep((prev) => prev - 1)
            }
        }

        return (
            <div>
                {step !== 0 && <IconButton onClick={handleBackwardsStep}>
                    <ArrowBackIosIcon />
                </IconButton>}

                {step !== MAX_NUMBER_OF_STEPS && <IconButton onClick={handleFowardStep}>
                    <ArrowForwardIosIcon />
                </IconButton>}
            </div>
        )
    }

    async function validateStep() {
        switch (stepOrder[step]) {

            case ItemStep:

                if (selectedSupermarketId === '') {
                    toast.error('Por favor, selecione um supermercado', toastConfig)
                    return false;
                }

                if (selectedItems.length === 0) {
                    toast.error('Por favor, selecione pelo menos um item', toastConfig)
                    return false;
                }

                if (selectedItems.find((item) => { return item.quantity <= 0 })) {
                    toast.error('Por favor, insira uma quantidade válida para todos os itens', toastConfig)
                    return false;
                }

                break;

            case BuyerStep:

                const valid = await trigger()

                if (!valid) {
                    return false;
                }

                break;
        }

        return true
    }

    async function submitData(data: FormDataType) {

        const orderData = { selectedSupermarketId, selectedItems, ...data }

        toast.promise(
            async () => {
                return await axios.post('/api/order/handler', orderData)
                    .then((res) => {
                        setCompleted(true)
                    })
            },
            {
                pending: 'Fazendo encomenda...',
                success: 'Encomenda feita com sucesso!',
                error: 'Não foi possível fazer a encomenda.',
            },
            toastConfig
        )
    }

    const stepOrder = [ItemStep, BuyerStep, ConfirmationStep];

	return (
		<div>
            { completed ?
                
                (<Completed />) 
                
                : 
                
                (<div>
                
                    <BackButton />

                    <h1>Fazer Encomenda</h1>

                    { stepOrder[step]() }

                    <Arrows />

                </div>)
            }
            
		</div>
	);
};

export default Order;
