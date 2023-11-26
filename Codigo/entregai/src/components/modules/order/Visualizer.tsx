import { Order } from "@/libs/types/Order";
import { Supermarket } from "@/libs/types/Supermarket"
import { Box, Button, Chip, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fade, FormControl, IconButton, InputAdornment, InputLabel, ListItemText, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TransitionGroup } from "react-transition-group";
import { Product } from "@/libs/types/Product";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";
import EditIcon from '@mui/icons-material/Edit';
import { Search } from "@mui/icons-material";

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'date', label: 'Data', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'manage', label: 'Gerenciar', minWidth: 100 }
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

const Visualizer = ({ setSupermarket, supermarket }: { setSupermarket: Function, supermarket: Supermarket }) => {

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
    
                    <TableCell>
                        <OrderOption order={order} />
                    </TableCell>
    
                </TableRow>
    
                <TableRow>
    
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
    
                        <Collapse in={open} timeout="auto" unmountOnExit>
    
                            <Box sx={{ margin: 1 }}>  

                                <Typography variant="h6" gutterBottom component="div">
                                    Detalhes
                                </Typography>

                                <Typography variant="body2" gutterBottom component="div">
                                    ID Pedido: <strong>#{order.id}</strong>
                                </Typography>

                                <Typography variant="body2" gutterBottom component="div">
                                    Cliente: {order.buyer.name}
                                </Typography>

                                <Typography variant="body2" gutterBottom component="div">
                                    Telefone: {order.buyer.phone}
                                </Typography>

                                <Typography variant="body2" gutterBottom component="div">
                                    Endereço: {order.buyer.address.street}, {order.buyer.address.neighborhood}, {order.buyer.address.number}, {order.buyer.address.complement}
                                </Typography>

                                <Typography variant="h6" gutterBottom component="div">
                                    Produtos
                                </Typography>

                                <Divider />

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

    const OrderOption = ({ order }: { order: Order }) => {

        const [ rejectModal, setRejectModal ] = useState(false)

        const [ cancelModal, setCancelModal ] = useState(false)

        const [ finalizeModal, setFinalizeModal ] = useState(false)

        const [ editModal, setEditModal ] = useState(false)

        const [ statusModal, setStatusModal ] = useState(order.status as number)

        const RejectModal = () => {

            return (
                <Dialog open={rejectModal}>
                    <DialogTitle>Recusar Pedido</DialogTitle>
                    <DialogContent>
                        <Typography>Tem certeza que deseja recusar o pedido?</Typography>
                        <Typography>(Não é possivel reverter essa ação)</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setRejectModal(false) }}>Não</Button>
                        <Button onClick={async () => { await updateOrderStatus(5, "Recusando pedido...", "Pedido recusado!", "Erro ao recusar pedido!")}}>Sim</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        const CancelModal = () => {

            return (
                <Dialog open={cancelModal}>
                    <DialogTitle>Cancelar Pedido</DialogTitle>
                    <DialogContent>
                        <Typography>Tem certeza que deseja cancelar o pedido?</Typography>
                        <Typography>(Não é possivel reverter essa ação)</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCancelModal(false) }}>Não</Button>
                        <Button onClick={async () => { await updateOrderStatus(6, "Cancelando pedido...", "Pedido cancelado!", "Erro ao cancelar pedido!")}}>Sim</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        const FinalizeModal = () => {

            return (
                <Dialog open={finalizeModal}>
                    <DialogTitle>Finalizar Pedido</DialogTitle>
                    <DialogContent>
                        <Typography>Tem certeza que deseja finalizar o pedido?</Typography>
                        <Typography>(Não é possivel reverter essa ação)</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setFinalizeModal(false) }}>Não</Button>
                        <Button onClick={async () => { await updateOrderStatus(4, "Finalizando pedido...", "Pedido finalizado!", "Erro ao finalizar pedido!")}}>Sim</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        const EditModal = () => {

            async function updateStatusByModal() {
                if (statusModal !== order.status) {
                    if (statusModal === 5) {
                        setRejectModal(true)
                    } else if (statusModal === 6) {
                        setCancelModal(true)
                    } else if (statusModal === 4) {
                        setFinalizeModal(true)
                    } else {
                        await updateOrderStatus(statusModal, "Atualizando status do pedido", "Status do pedido atualizado!", "Erro ao atualizar status do pedido!")
                    }
                }

                setEditModal(false)
            }

            return (
                <Dialog open={editModal}>
                    <DialogTitle>Editar Pedido</DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="statusSelectLabel">Status</InputLabel>

                            <Select
                                labelId="statusSelectLabel"
                                id="statusSelect"
                                value={statusModal}
                                onChange={(e) => { setStatusModal(e.target.value as number) }}
                                label="Status"
                                required
                            >

                                <MenuItem value={1}>
                                    <Chip label="APROVADO" color="success" />
                                </MenuItem>

                                <MenuItem value={2}>
                                    <Chip label="EM TRANSPORTE" color="info" />
                                </MenuItem>

                                <MenuItem value={3}>
                                    <Chip label="ENTREGUE" color="info" />
                                </MenuItem>

                                <MenuItem value={4}>
                                    <Chip label="FINALIZADO" color="success" />
                                </MenuItem>

                                <MenuItem value={5}>
                                    <Chip label="RECUSADO" color="error" />
                                </MenuItem>

                                <MenuItem value={6}>
                                    <Chip label="CANCELADO" color="error" />
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setEditModal(false) }}>Cancelar</Button>
                        <Button onClick={updateStatusByModal}>Atualizar</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        async function advanceStatus() {
            if ((order.status! + 1) === 4) {
                setFinalizeModal(true)
            } else {
                await updateOrderStatus((order.status! + 1), "Atualizando status do pedido", "Status do pedido atualizado!", "Erro ao atualizar status do pedido!")
            }
        }

        async function updateOrderStatus(updateCode: number, pending: string, success: string, error: string) {
            toast.promise(
                async () => {
                    return await axios.patch(`/api/order/handler?updateCode=${updateCode}&supermarketId=${supermarket.id}&orderId=${order.id}`)
                        .then((res) => {
                            setSupermarket(res.data.supermarket)
                        })
                },
                {
                    pending,
                    success,
                    error
                },
                toastConfig
            )
        }

        return (
            <div>
                <RejectModal />

                <CancelModal />

                <EditModal />

                <FinalizeModal />

                {order.status === 0 && <div>
                    <IconButton onClick={async () => { await updateOrderStatus(1, "Aprovando pedido...", "Pedido aprovado!", "Erro ao aprovar o pedido!")}}>
                        <CheckCircleIcon fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={() => { setRejectModal(true) }}>
                        <CancelIcon fontSize="medium" />
                    </IconButton>
                </div>}

                {order.status! < 4 && order.status! > 0 && <div>
                    <IconButton onClick={advanceStatus}>
                        <ArrowCircleRightIcon fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={() => { setEditModal(true) }}>
                        <EditIcon fontSize="medium" />
                    </IconButton>
                </div>}
            </div>
        )
    }

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)
    const [ orders, setOrders ] = useState<Order[]>([] as Order[])

    useEffect(() => {
        const sortedOrders = supermarket.orders!.sort((orderA, orderB) => {
            
            const statusComparison = orderA.status! - orderB.status!;
            
            if (statusComparison !== 0) {
                return statusComparison;
            }
    
            return new Date(orderB.date!).getTime() - new Date(orderA.date!).getTime()
        });

        setOrders(sortedOrders);
    
    }, [supermarket]);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - supermarket.orders!.length) : 0

    function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    function search(searchString: string) {

		if (page !== 0) {
			setPage(0)
		}

		const filteredRows = supermarket.orders!.filter((order) => {
			return order.buyer.name.toLowerCase().includes(searchString.toLowerCase())
		})

		setOrders(filteredRows)
	}

    return (
        <div>
            <TextField 
                onChange={(event) => { search(event.target.value) }} 
                label="Nome do Cliente" 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

            <Divider sx={{ marginTop: '2rem' }} />

            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 600 }}>

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

                        {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders).map((order: Order) => (

                            <Row key={order.id} order={order} />

                        ))}

                        {emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={7} />
							</TableRow>
						)}

                    </TableBody>

                    <TableFooter>
						<TableRow>
							<TablePagination 
                                labelDisplayedRows={({ from, to, count }) => `Exibindo da página ${from} até ${to}`}
                                labelRowsPerPage={"Linhas por página"} 
                                rowsPerPageOptions={[5, 10, 25]} 
                                colSpan={7} count={orders.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
						</TableRow>
					</TableFooter>

                </Table>

            </TableContainer>
        </div>
    )
}

export default Visualizer