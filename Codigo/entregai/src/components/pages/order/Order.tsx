import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Checkbox, FormControl, IconButton, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { useMemo, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from "react-hook-form";

const MAX_NUMBER_OF_STEPS = 2

type FormDataType = {
    name: string,
    phone: string,
    address: string,
}

const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const OrderBuyerDetails = () => {
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
                    label="Telefone" 
                    {...register("phone", { required: "Insira o telefone" })} 
                    error={Boolean(errors.phone?.message)}
                    helperText={errors.phone?.message}
                    variant="outlined" 
                />

                <TextField 
                    label="Endereço" 
                    {...register("address", { required: "Insira o seu endereço" })} 
                    error={Boolean(errors.address?.message)}
                    helperText={errors.address?.message}
                    variant="outlined" 
                />

            </div>
        )
    }

    const OrderConfirmationDetails = () => {
        return (
            <div>

                <p>Por favor, confirme os dados da sua encomenda</p>

                <p>Supermercado: {selectedSupermarket?.name}</p>

                <p>Itens:</p>

                {selectedSupermarket?.stock.map((item) => (
                    selectedItemsId.includes(item.id) && <p key={item.id}>{item.name}</p>
                ))}

                <p>Nome: {getValues("name")}</p>

                <p>Telefone: {getValues("phone")}</p>

                <p>Endereço: {getValues("address")}</p>

                <Button onClick={handleSubmit(submitData)} variant="contained">Fazer Encomenda</Button>
            </div>
        )
    }

    const OrderSupermarketDetails = () => {
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
                    >
                        {systemSupermarkets.map((sup: Supermarket) => (
                            <MenuItem key={sup.id} value={sup.id}>
                                <ListItemText primary={sup.name} />
                            </MenuItem>
                        ))}
                    
                    </Select>

                </FormControl>

                <p>Por favor, selecione os itens que deseja encomendar</p>

                {selectedSupermarket?.stock.map((item) => (
                    <div key={item.id}>
                        <Checkbox 
                            checked={selectedItemsId.includes(item.id)} 
                            onChange={() => handleCheckbox(item.id)}
                        />
                        {item.stockQuantity == 0 ? item.name + " (Indisponível)" : item.name}
                    </div>
                ))}
            </div>
        )
    }

    const [step, setStep] = useState(0)
    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');
    const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);
    const { register, getValues, trigger, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            phone: "",
            address: "",
        }
    })

    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    function handleSupermarket(event: SelectChangeEvent) {
        setSelectedSupermarketId(event.target.value);
        setSelectedItemsId([]);
    };

    function handleCheckbox(itemId: string) {
        if (selectedItemsId.includes(itemId)) {
            setSelectedItemsId(selectedItemsId.filter((id) => id !== itemId));
        } else {
            setSelectedItemsId([...selectedItemsId, itemId]);
        }
    }

    async function handleFowardStep() {
        if (step === 0) {
            if (selectedSupermarketId === '') {
                
                return;
            }

            if (selectedItemsId.length === 0) {
                alert('Por favor, selecione pelo menos um item');
                return;
            }
        }

        if (step === 1) {
            const valid = await trigger()

            if (!valid) {
                return;
            }
        }

        if (step < MAX_NUMBER_OF_STEPS) {
            setStep((prev) => prev + 1)
        }
    }

    function handleBackwardsStep() {
        if (step > 0) {
            setStep((prev) => prev - 1)
        }
    }

    async function submitData(data: FormDataType) {

        const orderData = { selectedSupermarketId, selectedItemsId, ...data }

        await axios.post('/api/order', orderData)
            .then((res) => {
                if (res.status === 200) {
                    alert('Encomenda feita com sucesso');
                }
            })
    }

	return (
		<div>
            <BackButton />

			<h1>Fazer Encomenda</h1>

            { step === 0 && <OrderSupermarketDetails /> }

            { step === 1 && <OrderBuyerDetails /> }

            { step === 2 && <OrderConfirmationDetails /> }

            {step !== 0 && <IconButton onClick={handleBackwardsStep}>
                <ArrowBackIosIcon />
            </IconButton>}

            {step !== MAX_NUMBER_OF_STEPS && <IconButton onClick={handleFowardStep}>
                <ArrowForwardIosIcon />
            </IconButton>}
		</div>
	);
};

export default Order;
