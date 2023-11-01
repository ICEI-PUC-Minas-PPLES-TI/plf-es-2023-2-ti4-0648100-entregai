import { Order } from "@/libs/types/Order";
import { Supermarket } from "@/libs/types/Supermarket"
import { Box, Chip, Collapse, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TransitionGroup } from "react-transition-group";
import { Product } from "@/libs/types/Product";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'date', label: 'Data', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'buyerName', label: 'Cliente', minWidth: 100 },
    { id: 'adress', label: 'Endereço', minWidth: 100 },
    { id: 'phone', label: 'Telefone', minWidth: 100 },
    { id: 'manage', label: 'Estagio', minWidth: 100 }
]

type OrderProduct = {
    product: Product,
    quantity: number
}

const getStatus = (status: number) => {
    switch (status) {
        case 0:
            return <Chip label="EM ANALISE" color="warning" />
        case 1:
            return <Chip label="APROVADO" color="primary" />
        case 2:
            return <Chip label="EM TRANSPORTE" color="info" />
        case 3:
            return <Chip label="ENTREGUE" color="success" />
        case 4:
            return <Chip label="RECUSADO" color="error" />
    }
}

const Visualizer = ({ supermarket }: { supermarket: Supermarket }) => {

    const Row = ({ order }: { order: Order }) => {

        const [ open, setOpen ] = useState<boolean>(false)
    
        const items: OrderProduct[] = order.items.map((orderItem) => {
            
            const stockItem = supermarket.stock!.find((stockItem) => orderItem.productId === stockItem.id)
        
            const orderProduct: OrderProduct = { product: stockItem as Product, quantity: orderItem.quantity }
        
            return orderProduct
        })
    
        return (
            <React.Fragment>
            
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
    
                    <TableCell>
    
                        <IconButton size="small" onClick={() => setOpen(!open)} >
                            
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    
                        </IconButton>
    
                    </TableCell>
    
                    <TableCell component={"th"} scope="row">{order.id.substring(0, 5)}</TableCell>
    
                    <TableCell align="left">{order.date}</TableCell>

                    <TableCell align="left">{getStatus(order.status!)}</TableCell>
    
                    <TableCell align="left">{order.buyer.name}</TableCell>
    
                    <TableCell align="left">
                        {order.buyer.address.street},
                        {order.buyer.address.neighborhood},
                        {order.buyer.address.number},
                        {order.buyer.address.complement}
                    </TableCell>
    
                    <TableCell align="left">{order.buyer.phone}</TableCell>
    
                    <TableCell>
                        <IconButton>
                            <ArrowCircleLeftIcon fontSize="medium" />
                        </IconButton>
                        <IconButton>
                            <ArrowCircleRightIcon fontSize="medium" />
                        </IconButton>
                    </TableCell>
    
                </TableRow>
    
                <TableRow>
    
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
    
                        <Collapse in={open} timeout="auto" unmountOnExit>
    
                            <Box sx={{ margin: 1 }}>  
    
                                <Typography variant="h6" gutterBottom component="div">
                                    Produtos
                                </Typography>
    
                                <Table size="small">
    
                                    <TableHead>
    
                                        <TableRow>
    
                                            <TableCell>Produto</TableCell>
    
                                            <TableCell>Quantidade</TableCell>
    
                                            <TableCell>Preço</TableCell>
    
                                            <TableCell>Total</TableCell>
    
                                        </TableRow>
                                        
                                    </TableHead>
    
                                    <TableBody>
    
                                        { items.map((item) => (

                                            <TableRow key={item.product.id}>

                                                <TableCell>{item.product.name}</TableCell>

                                                <TableCell>{item.quantity}</TableCell>

                                                <TableCell>{item.product.price}</TableCell>

                                                <TableCell>{(item.product.price * item.quantity)}</TableCell>

                                            </TableRow>

                                        ))}

                                        <TableRow>
                                            <TableCell rowSpan={3} colSpan={2} />
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell align="left">R$ {Number(order.subtotal).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Frete</TableCell>
                                            <TableCell align="left">R$ {Number(order.shipping).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell align="left">R$ {(Number(order.subtotal) + Number(order.shipping)).toFixed(2)}</TableCell>
                                        </TableRow>
    
                                    </TableBody>
                                    
                                </Table>
    
                            </Box>
    
                        </Collapse>
    
                    </TableCell>
    
                </TableRow>
    
            </React.Fragment>
        )
    
    }

    const [ orders, setOrders ] = useState<Order[]>(supermarket.orders as Order[])
    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0

    function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700 }}>

                <TableHead>

                    <TableRow>

                        <TableCell />

                        {columns.map((column) => (
                            <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </TableCell>
                        ))}

                    </TableRow>

                </TableHead>

                <TableBody>

                    <TransitionGroup component={null}>
                    
                        {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders).map((order: Order) => (

                            <Row key={order.id} order={order} />

                        ))}

                    </TransitionGroup>

                </TableBody>

            </Table>

        </TableContainer>
    )
}

export default Visualizer