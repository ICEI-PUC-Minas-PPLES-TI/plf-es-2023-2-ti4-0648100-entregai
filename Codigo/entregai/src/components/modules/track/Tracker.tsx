import toastConfig from "@/libs/toast/toastConfig"
import { Item } from "@/libs/types/Item"
import { Order } from "@/libs/types/Order"
import { Product } from "@/libs/types/Product"
import { Supermarket } from "@/libs/types/Supermarket"
import { ArrowForwardIos } from "@mui/icons-material"
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const getStatus = (status: number) => {
    switch (status) {
        case 0:
            return <Chip label="EM ANALISE" color="warning" />
        case 1:
            return <Chip label="APROVADO" color="success" />
        case 2:
            return <Chip label="EM TRANSPORTE" color="info" />
        case 3:
            return <Chip label="ENTREGUE" color="info" />
        case 4:
            return <Chip label="FINALIZADO" color="success" />
        case 5:
            return <Chip label="RECUSADO" color="error" />
        case 6:
            return <Chip label="CANCELADO" color="error" />
    }
}

type OrderProduct = {
    product: Product,
    quantity: number
}

const Tracker = () => {

    const [ order, setOrder ] = useState<Order>({ items: [] as Item[]} as Order)

    const [ supermarket, setSupermarket ] = useState<Supermarket>({} as Supermarket)

    const [ cancelModal, setCancelModal ] = useState<boolean>(false)

    const { register, handleSubmit } = useForm()

    const router = useRouter()

    const items: OrderProduct[] = order.items.map((orderItem) => {
            
        const stockItem = supermarket.stock!.find((stockItem) => orderItem.productId === stockItem.id)
    
        const orderProduct: OrderProduct = { product: stockItem as Product, quantity: orderItem.quantity }
    
        return orderProduct
    })

    async function submitData(data: any) {
        toast.promise(
            async () => {
                return await axios.post('/api/order/track', data)
                    .then((res) => {
                        setOrder(res.data.order) 
                        setSupermarket(res.data.supermarket)
                    })
            }, 
            {
                pending: 'Buscando pedido...',
                success: 'Pedido encontrado!',
                error: 'Não foi possível encontrar o pedido.'
            },
            toastConfig
        )
    } 

    function cancelOrder() {

        setCancelModal(false)

        toast.promise(
            async () => {
                return await axios.patch(`/api/order/handler?updateCode=6&supermarketId=${supermarket.id}&orderId=${order.id}`)
                    .then(() => { router.replace('/track') })
            },
            {
                pending: 'Cancelando pedido...',
                success: 'Pedido cancelado com sucesso!',
                error: 'Não foi possível cancelar o pedido.'
            },
            toastConfig
        )
    }

    return (
        <div>
            <TextField
                id="orderCode"
                label="Código do pedido"
                variant="outlined"
                size="small" 
                sx={{ mb: 2, marginRight: '1rem', height: '2.5rem' }}
                {...register("orderCode")}
            />

            <Button variant="contained" sx={{ height: '2.5rem' }} onClick={handleSubmit(submitData)}>Buscar
            <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                >
                    <ArrowForwardIos />
                </IconButton>
            </Button>

            {order.id && <div>

                <Dialog open={cancelModal}>
                    <DialogTitle>Cancelar Pedido</DialogTitle>
                    <DialogContent>
                        <Typography>Tem certeza que deseja cancelar o pedido?</Typography>
                        <Typography>(Não é possivel reverter essa ação)</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCancelModal(false) }}>Não</Button>
                        <Button onClick={cancelOrder}>Sim</Button>
                    </DialogActions>
                </Dialog>

                <Typography variant="h6" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                    Pedido 
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    ID: #{order.id}
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Data do Pedido: {order.date}
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Status: {getStatus(order.status!)}
                </Typography>

                {order.status! < 4 && <Button variant="contained" onClick={() => { setCancelModal(true) }}>Cancelar Pedido</Button>}

                <Typography variant="h6" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                    Cliente
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Nome: {order.buyer.name}
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Endereço de Entrega: {order.buyer.address.street}, {order.buyer.address.number}, {order.buyer.address.complement} - {order.buyer.address.neighborhood}
                </Typography>

                <Typography variant="h6" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                    Supermercado
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Nome: {supermarket.name}
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Endereço: {supermarket.address}
                </Typography>

                <Typography variant="body1" noWrap component="div">
                    Telefone: {supermarket.phone}
                </Typography>

                <Typography variant="h6" noWrap component="div" sx={{ padding: '1.5rem 0' }}>
                    Produtos:
                </Typography>

                <Typography>
                    Método de Pagamento: {order.paymentMethod}
                </Typography>
                
                <Typography variant="body1" noWrap component="div">
                    Total: {order.subtotal}
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
                                {items.map((item) => (
                                    <TableRow key={item.product.id}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.product.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.quantity * item.product.price}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell rowSpan={3} colSpan={2} />
                                    <TableCell>Frete</TableCell>
                                    <TableCell align="left">R$ {order.shipping}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell align="left">R$ {order.subtotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell align="left">R$ {(Number(order.shipping) + Number(order.subtotal)).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

            </div>}
        </div>
    )
}

export default Tracker