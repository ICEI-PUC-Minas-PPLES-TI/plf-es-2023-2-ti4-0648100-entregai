import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Checkbox, FormControl, IconButton, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Product } from "@/libs/types/Product";

const MAX_NUMBER_OF_STEPS = 2

type FormDataType = {
    name: string,
    phone: string,
    address: string,
}


const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const [step, setStep] = useState(0)

    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');

    const [selectedItems, setSelectedItems] = useState<Product[]>([]);
    
    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    const { register, getValues, trigger, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
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

        function handleCheckbox(item: Product) {
            if (selectedItems.includes(item)) {
                setSelectedItems(selectedItems.filter((includedItem) => includedItem !== item));
            } else {
                setSelectedItems([...selectedItems, item]);
            }
        }

        function handleTextField(item: Product, event: ChangeEvent) {
            
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

                {selectedSupermarket?.stock.map((item: Product) => (
                    <div key={item.id}>
                        <Checkbox 
                            checked={selectedItems.includes(item)} 
                            onChange={() => handleCheckbox(item)}
                        />
                        <TextField
                            onChange={(event) => handleTextField(item, event)}
                            disabled={!selectedItems.includes(item)}
                        />
                        {item.stockQuantity == 0 ? item.name + " (Indisponível)" : item.name}
                    </div>
                ))}
            </div>
        )
    }

    const BuyerStep = () => {

        function validate() {

        }

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

    const ConfirmationStep = () => {
        
        return (
            <div>

                <p>Por favor, confirme os dados da sua encomenda</p>

                <p>Supermercado: {selectedSupermarket?.name}</p>

                <p>Itens:</p>

                {selectedSupermarket?.stock.map((item) => (
                    selectedItems.includes(item) && <p key={item.id}>{item.name}</p>
                ))}

                <p>Nome: {getValues("name")}</p>

                <p>Telefone: {getValues("phone")}</p>

                <p>Endereço: {getValues("address")}</p>

                <Button onClick={handleSubmit(submitData)} variant="contained">Fazer Encomenda</Button>
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
                    alert('Por favor, selecione um supermercado');
                    return false;
                }

                if (selectedItems.length === 0) {
                    alert('Por favor, selecione pelo menos um item');
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

        await axios.post('/api/order/handler', orderData)
            .then((res) => {
                if (res.status === 200) {
                    alert('Encomenda feita com sucesso');
                }
            })
    }

    const stepOrder = [ItemStep, BuyerStep, ConfirmationStep];

	return (
		<div>
            <BackButton />

			<h1>Fazer Encomenda</h1>

            { stepOrder[step]() }

            <Arrows />
		</div>
	);
};

export default Order;
