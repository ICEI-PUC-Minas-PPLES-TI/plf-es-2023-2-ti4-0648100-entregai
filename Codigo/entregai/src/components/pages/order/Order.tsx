import BackButton from "@/components/misc/BackButton";
import { Supermarket } from "@/libs/types/Supermarket";
import { Box, Button, Checkbox, Divider, Fade, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Slide, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Product } from "@/libs/types/Product";
import { Item } from "@/libs/types/Item";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";
import { CheckCircle, ShoppingBasket, Place, Badge, LocalPhone, CreditCard, Send } from '@mui/icons-material';
import styles from './Order.module.scss';
import { useRouter } from "next/navigation";

const MAX_NUMBER_OF_STEPS = 2

// cep, rua, bairro, complemento, numero, cidade, estado

type FormDataType = {
    paymentMethod: string,
    name: string,
    phone: string,
    cep: string,
    street: string,
    neighborhood: string,
    complement: string,
    number: string,
}

const steps = [
    'Selecionar produtos',
    'Inserir dados',
    'Confirmar pedido',
];


const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const router = useRouter()

    const pricePerKilometer = 2.5

    const [step, setStep] = useState(0)

    const [ validCep, setValidCep ] = useState<boolean>(false)

    const [completed, setCompleted] = useState({ status: false, trackingCode: ''})

    const [frete, setFrete] = useState('0')

    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');

    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    const [ stock, setStock ] = useState<Product[]>([] as Product[])

    const selectedProducts = selectedItems.map((item) => {
        const product = selectedSupermarket?.stock?.find((stockItem) => stockItem.id === item.productId) as Product;
        return { id: product.id, itemName: product.name, price: product.price, quantity: item.quantity };
    })

    const subtotal = selectedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

    const calculateShipping = async () => {
        return await axios.post('/api/order/shipping', { selectedSupermarketId, address: `${getValues("street")}, ${getValues("neighborhood")}, ${getValues("number")}, ${getValues("complement")}` })
            .then((res) => {

                console.log(res.status);

                var price = (Number(res.data.distance) / 1000) * pricePerKilometer

                setFrete(price.toFixed(2))
            })

            .catch((err) => {

                throw new Error('teste')
            })
    }

    const validateCep = async () => {

        const cep = getValues("cep")

        toast.promise(
            async () => {
                return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                    .then((res) => {

                        if (res.data.erro) {

                            setValidCep(false)

                            throw new Error("CEP Inválido")

                        } else {

                            const { logradouro, bairro } = res.data

                            setValidCep(true)

                            setValue("street", logradouro)
                            setValue("neighborhood", bairro)
                        }
                    }
                    )
            },
            {
                pending: 'Validando CEP...',
                success: 'CEP validado com sucesso!',
                error: 'CEP Inválido',
            },
            toastConfig
        )
    }

    const { register, getValues, setValue, reset, trigger, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            paymentMethod: "",
            name: "",
            phone: "",
            address: "",
            cep: "",
            street: "",
            neighborhood: "",
            complement: "",
            number: "",
            city: "",
            state: "",
        }
    })

    const ItemStep = () => {

        function handleSupermarket(event: SelectChangeEvent) {
            setSelectedSupermarketId(event.target.value);
            setSelectedItems([]);
            setStock(systemSupermarkets.find((sup) => sup.id === event.target.value)?.stock!);
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

        function search(searchString: string) {
    
            const filteredRows = selectedSupermarket.stock!.filter((item) => {
                return item.name.toLowerCase().includes(searchString.toLowerCase())
            })
    
            setStock(filteredRows)
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
                        <Place sx={{ marginRight: 1.5, color: "primary.dark" }} />
                        Selecione o supermercado mais próximo:
                    </Typography>

                    <FormControl sx={{ width: 300 }}>

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
                        <ShoppingBasket sx={{ marginRight: 1.5, color: "primary.dark" }} />
                        Selecione os produtos e quantidade que deseja:
                    </Typography>

                <TextField onChange={(event) => { search(event.target.value) }} label="Nome do Produto" />

                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Quantidade em Estoque</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stock.map((item: Product) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {/* Essa checkbox está dando problemas, olhar no console do cliente */}
                                            {item.stockQuantity === 0 ? (
                                                <div>
                                                    <Checkbox disabled={true} />
                                                    {item.name} (Indisponível)
                                                </div>
                                            ) : (
                                                <div>
                                                    <Checkbox
                                                    checked={selectedItems.some(
                                                        (selectedItem: Item) => selectedItem.productId === item.id
                                                    )}
                                                    onChange={() => handleCheckbox(item.id)}
                                                    />
                                                    {item.name}
                                                </div>
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
                                        <TableCell>
                                            {item.stockQuantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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

                    <Box className={styles.content}>

                        <Divider textAlign="center">
                            <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular' }}>
                                Dados do cliente
                            </Typography>
                        </Divider>

                        <Box sx={{ margin: '2rem 0' }}>
                            <Grid container rowSpacing={3} columnSpacing={1}>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Nome"
                                        {...register("name", { required: "Por favor, insira o seu nome" })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Badge />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: '100%' }}
                                        error={Boolean(errors.name?.message)}
                                        helperText={errors.name?.message}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Telefone"
                                        {...register("phone", {
                                            required: "Por favor, insira seu número de telefone",
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "Insira apenas números"
                                            }
                                        })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhone />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: '100%' }}
                                        error={Boolean(errors.phone?.message)}
                                        helperText={errors.phone?.message}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="CEP"
                                        {...register("cep", { required: "Por favor, insira o seu CEP" })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Place />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: '100%' }}
                                        error={Boolean(errors.cep?.message)}
                                        helperText={errors.cep?.message}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Button onClick={validateCep} variant="contained">Validar Cep</Button>

                                <Grid item xs={12}>
                                    <Controller
                                        control={control}
                                        name="street"
                                        rules={{ required: "Por favor, insira a sua rua" }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                label="Rua"
                                                onChange={onChange}
                                                value={value}
                                                sx={{ width: '100%' }}
                                                disabled={true}
                                                error={Boolean(errors.street?.message)}
                                                helperText={errors.street?.message}
                                                variant="outlined"
                                            />
                                        )}

                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        name="neighborhood"
                                        control={control}
                                        rules={{ required: "Por favor, insira o bairro" }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                label="Bairro"
                                                onChange={onChange}
                                                value={value}
                                                sx={{ width: '100%' }}
                                                disabled={true}
                                                error={Boolean(errors.neighborhood?.message)}
                                                helperText={errors.neighborhood?.message}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Número"
                                        {...register("number", { required: "Por favor, insira o número" })}
                                        sx={{ width: '100%' }}
                                        disabled={!validCep}
                                        error={Boolean(errors.number?.message)}
                                        helperText={errors.number?.message}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Complemento"
                                        {...register("complement", { required: "Por favor, insira o complemento" })}
                                        sx={{ width: '100%' }}
                                        disabled={!validCep}
                                        error={Boolean(errors.complement?.message)}
                                        helperText={errors.complement?.message}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider textAlign="center">
                            <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular' }}>
                                Dados do pagamento
                            </Typography>
                        </Divider>

                        <Box sx={{ minWidth: 120, margin: '2rem 0' }}>
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
                                            startAdornment={
                                                <ListItemIcon>
                                                    <CreditCard />
                                                </ListItemIcon>
                                            }
                                        >
                                            <MenuItem value={"Credito"}>Crédito</MenuItem>
                                            <MenuItem value={"Debito"}>Débito</MenuItem>
                                            <MenuItem value={"Dinheiro"}>Dinheiro</MenuItem>
                                        </Select>
                                    )}
                                    defaultValue=""
                                />
                                {errors.paymentMethod?.message && <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>}
                            </FormControl>
                        </Box>
                    </Box>
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

                    <Box className={styles.content}>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', margin: '2rem 0' }}>
                            Por favor, confirme os dados do pedido:
                        </Typography>


                        <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold', margin: '0.2rem 0' }}>
                            Unidade
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: 'fontWeightRegular' }}>
                            {selectedSupermarket?.name}
                        </Typography>

                        <Divider sx={{ margin: '1rem 0' }} />

                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', margin: '0.2rem 0' }}>
                            Dados do cliente
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: 'fontWeightRegular' }}>
                            <span style={{ fontWeight: 'bold' }}>Nome:</span> {getValues("name")} <br />
                            <span style={{ fontWeight: 'bold' }}>Telefone:</span> {getValues("phone")} <br />
                            <span style={{ fontWeight: 'bold' }}>Endereço de entrega:</span> {getValues("address")} <br />
                            <span style={{ fontWeight: 'bold' }}>Forma de Pagamento:</span> {getValues("paymentMethod")} <br />
                        </Typography>

                        <Divider sx={{ margin: '1rem 0' }} />

                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', margin: '0.2rem 0' }}>
                            Itens do pedido
                        </Typography>

                        <Table sx={{ marginBottom: '1.5rem' }}>
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
                                    <TableCell align="left">R$ {(Number(frete) + subtotal).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={handleSubmit(submitData)} variant="contained" endIcon={<Send />} size="large">
                                Confirmar pedido
                            </Button>
                        </div>
                    </Box>
                </div>
            </Fade>
        )
    }

    const Completed = () => {

        return (
            <Fade in={completed.status} timeout={500}>
                <div className={styles.success}>
                    <div>
                        <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'fontWeightBold', marginBottom: '1rem' }}>
                            Pedido realizado com sucesso!
                        </Typography>

<<<<<<< Updated upstream
                        <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular', marginBottom: '1rem' }}>
                            <CheckCircle />
                            Seu pedido será entregue em breve.
                        </Typography>

                        <Typography></Typography>
=======
                        <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular' }}>Codigo de Rastreio: {completed.trackingCode}</Typography>
                        
                        <Typography variant="body1" noWrap component="div" sx={{ fontWeight: 'fontWeightRegular' }}>
                            <CheckCircle />
                            Seu pedido será entregue em breve.
                        </Typography>
                        
                        <Button onClick={() => {
                            setCompleted({ status: false, trackingCode: '' });
                            setStep(0);
                            setSelectedSupermarketId('');
                            setSelectedItems([]);
                            reset();
                            router.replace('/order')
                        }} variant="contained">
                            Fazer outro pedido
                        </Button>
                    </div>
>>>>>>> Stashed changes

                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={() => {
                                setCompleted({ status: false, trackingCode: '' });
                                setStep(0);
                                setSelectedSupermarketId('');
                                setSelectedItems([]);
                                reset();
                            }} variant="contained">
                                Fazer outro pedido
                            </Button>
                        </div>
                    </div>
                </div>
            </Fade>
        );

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

                if (selectedItems.find((item) => { return item.quantity > selectedSupermarket?.stock?.find((stockItem) => stockItem.id === item.productId)?.stockQuantity! })) {
                    toast.error('Por favor, insira uma quantidade menor ou igual a quantidade em estoque para todos os itens', toastConfig)
                    return false;
                }

                break;

            case BuyerStep:

                const valid = await trigger()

                if (!valid) {
                    return false;
                }

                if (!validCep) {
                    toast.error('Por favor, insira um CEP válido', toastConfig)
                    return false;
                }

                await toast.promise(
                    await calculateShipping,
                    {
                        pending: 'Calculando frete...',
                        success: 'Frete calculado com sucesso!',
                        error: 'Erro ao calcular o frete',
                    },
                    toastConfig)

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
                        setCompleted({ status: true, trackingCode: res.data.trackingCode })
                    })
            },
            {
                pending: 'Fazendo pedido...',
                success: 'Pedido realizado com sucesso!',
                error: 'Não foi possível fazer o pedido.',
            },
            toastConfig
        )
    }

    const stepOrder = [ItemStep, BuyerStep, ConfirmationStep];

    return (
        <div>
            {completed.status ?

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
