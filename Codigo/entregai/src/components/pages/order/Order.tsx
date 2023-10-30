import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";
import { Box, Button, Checkbox, Fade, FormControl, FormHelperText, IconButton, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Slide, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Product } from "@/libs/types/Product";
import { Item } from "@/libs/types/Item";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './Order.module.scss';

const MAX_NUMBER_OF_STEPS = 2

type FormDataType = {
    paymentMethod: string,
    name: string,
    phone: string,
    address: string,
}

const steps = [
    'Selecionar produtos',
    'Inserir dados',
    'Confirmar pedido',
];


const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const pricePerKilometer = 2.5

    const [step, setStep] = useState(0)

    const [completed, setCompleted] = useState<boolean>(false)

    const [frete, setFrete] = useState('0')

    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');

    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    const selectedProducts = selectedItems.map((item) => {
        const product = selectedSupermarket?.stock?.find((stockItem) => stockItem.id === item.productId) as Product;
        return { id: product.id, itemName: product.name, price: product.price, quantity: item.quantity };
    })

    const subtotal = selectedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

    const shipping = async () => {

        await axios.post('/api/order/shipping', { selectedSupermarketId, address: getValues("address") })
            .then((res) => {

                var price = (Number(res.data.distance) / 1000) * pricePerKilometer

                setFrete(price.toFixed(2))
            })
    }

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

                const newItem: Item = { productId: itemId, quantity: 1 }

                setSelectedItems([...selectedItems, newItem]);
            }
        }

        function handleTextField(itemId: string, event: ChangeEvent) {
            // update the "quantity" field of the Item in the selectedItems array that corresponds to the itemId
            var newQuantity = parseInt((event.target as HTMLInputElement).value);

            if (isNaN(newQuantity)) {
                newQuantity = 0
            }

            const newItem: Item = { productId: itemId, quantity: newQuantity }

            const newSelectedItems = selectedItems.map((item) => {
                if (item.productId === newItem.productId) {
                    return newItem;
                }
                return item;
            });

            setSelectedItems(newSelectedItems);
        }

        return (
            <div className={styles.container}>
                <Box sx={{ width: '100%', margin: 0.5 }}>
                    <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box className={styles.content}>
                    <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', marginBottom: 2 }}>
                        Selecione o supermercado mais próximo:
                    </Typography>

                    <FormControl sx={{ width: 350 }}>

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

                </Box>

                <Box className={styles.content}>

                    <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', marginBottom: 2 }}>
                        Selecione os produtos e quantidade que deseja:
                    </Typography>

                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedSupermarket?.stock?.map((item: Product) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.some(
                                                    (selectedItem: Item) => selectedItem.productId === item.id
                                                )}
                                                onChange={() => handleCheckbox(item.id)}
                                            />
                                            {item.stockQuantity === 0 ? (
                                                <span>
                                                    {item.name} (Indisponível)
                                                </span>
                                            ) : (
                                                item.name
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                onChange={(event) => handleTextField(item.id, event)}
                                                value={selectedItems.find(
                                                    (selectedItem: Item) => selectedItem.productId === item.id
                                                )?.quantity}
                                                disabled={!selectedItems.some(
                                                    (selectedItem: Item) => selectedItem.productId === item.id
                                                )}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: 50, marginRight: 1.5 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    {/* {selectedSupermarket?.stock?.map((item: Product) => (

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
                                sx={{ width: 50, marginRight: 1.5 }}
                            />

                            {item.stockQuantity == 0 ? item.name + " (Indisponível)" : item.name}

                        </div>
                    ))} */}
                </Box>
            </div>
        )
    }

    const BuyerStep = () => {

        return (
            <Fade in={step === 1} timeout={500}>
                <div className={styles.container}>
                    <Box sx={{ width: '100%', margin: 0.5 }}>
                        <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

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
                                render={({ field: { onChange, value } }) => (
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
            </Fade>
        )
    }

    const ConfirmationStep = () => {

        return (
            <Fade in={step === 2} timeout={500}>
                <div className={styles.container}>

                    <Box sx={{ width: '100%', margin: 0.5 }}>
                        <Stepper activeStep={2} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <p>Por favor, confirme os dados da sua encomenda</p>

                    <h3>Supermercado:</h3>

                    <p>{selectedSupermarket?.name}</p>

                    <h3>Dados</h3>

                    <p>Nome: {getValues("name")}</p>

                    <p>Telefone: {getValues("phone")}</p>

                    <p>Endereço: {getValues("address")}</p>

                    <p>Forma de Pagamento: {getValues("paymentMethod")}</p>

                    <h3>Itens:</h3>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Sub-Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedProducts.map((selectedProduct) => (
                                <TableRow key={selectedProduct.id}>
                                    <TableCell>{selectedProduct.itemName}</TableCell>
                                    <TableCell>{selectedProduct.price}</TableCell>
                                    <TableCell>{selectedProduct.quantity}</TableCell>
                                    <TableCell>{selectedProduct.quantity * selectedProduct.price}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell rowSpan={3} colSpan={2} />
                                <TableCell>Frete</TableCell>
                                <TableCell align="left">R$ {frete}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Subtotal</TableCell>
                                <TableCell align="left">R$ {subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell align="left">R$ {(Number(frete) + subtotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button onClick={handleSubmit(submitData)} variant="contained">Fazer Encomenda</Button>
                </div>
            </Fade>
        )
    }

    const Completed = () => {

        return (
            <Fade in={completed} timeout={500}>
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
            </Fade>
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
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '1.5rem',
            }}>
                {step !== 0 && <IconButton onClick={handleBackwardsStep}>
                    <ArrowBackIosIcon />
                </IconButton>}

                {step !== MAX_NUMBER_OF_STEPS && <IconButton onClick={handleFowardStep}>
                    <ArrowForwardIosIcon />
                </IconButton>}
            </Box>
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

                shipping()

                break;
        }

        return true
    }

    async function submitData(data: FormDataType) {

        const orderData = { selectedSupermarketId, selectedItems, frete, subtotal, ...data }

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
            {completed ?

                (<Completed />)

                :

                (<>

                    <BackButton />

                    <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', padding: '1.5rem' }}>
                        Novo pedido
                    </Typography>

                    {stepOrder[step]()}

                    <Arrows />

                </>)
            }

        </div>
    );
};

export default Order;
