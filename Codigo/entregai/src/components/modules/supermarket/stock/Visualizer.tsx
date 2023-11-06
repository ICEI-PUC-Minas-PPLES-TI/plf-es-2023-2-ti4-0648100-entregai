import { Supermarket } from "@/libs/types/Supermarket"
import { TextField, Autocomplete, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Fade } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Edit from "./Edit";
import { Product } from "@/libs/types/Product";
import Delete from "./Delete";
import { TransitionGroup } from "react-transition-group";

const columns = [
	{ id: 'code', label: 'Codigo', minWidth: 100 },
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'price', label: 'Preço', minWidth: 100 },
    { id: 'stockQuantity', label: 'Quantidade em Estoque', minWidth: 100 },
    { id: 'soldQuantity', label: 'Quantidade Vendida', minWidth: 100},
    { id: 'profit', label: 'Lucro Total', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100 },
]

const Visualizer = ({ supermarket, setSupermarketDetails }: { supermarket: Supermarket, setSupermarketDetails: Function }) => {

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)

	const [ stock, setStock ] = useState<Product[]>(supermarket.stock!)

	useEffect(() => { setStock(supermarket.stock!) }, [ supermarket ])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stock!.length) : 0

    function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

	function search(searchString: string) {

		if (page !== 0) {
			setPage(0)
		}

		const filteredRows = supermarket.stock!.filter((stockItem) => {
			return stockItem.name.toLowerCase().includes(searchString.toLowerCase())
		})

		setStock(filteredRows)
	}

    return (    
		<div>

			<TextField onChange={(event) => { search(event.target.value) }} label="Busca Item por Nome" />

			<TableContainer component={Paper}>

				<Table sx={{ minWidth: 700 }}>

					{/* Cabeçalho da Tabela */}

					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					{/* Corpo da Tabela */}

					<TableBody>

						<TransitionGroup component={null}>
						
							{(rowsPerPage > 0 ? stock!.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : stock!).map((stockItem: Product) => (
								
								<Fade in timeout={500} key={stockItem.id}>

									<TableRow>
										
										<TableCell align="left">{stockItem.id.substring(0, 5)}</TableCell>

										<TableCell align="left">{stockItem.name}</TableCell>

										<TableCell align="left">{stockItem.price.toFixed(2)}</TableCell>

										<TableCell align="left">{stockItem.stockQuantity}</TableCell>

										<TableCell align="left">{stockItem.soldQuantity}</TableCell>

										<TableCell align="left">{(Number(stockItem.soldQuantity) * Number(stockItem.price)).toFixed(2)}</TableCell>

										<TableCell align="center">

											<Edit setSupermarketDetails={setSupermarketDetails} supermarket={supermarket} product={stockItem}/>

											<Delete setSupermarketDetails={setSupermarketDetails} supermarket={supermarket} product={stockItem}/>

										</TableCell>

									</TableRow>

								</Fade>
							))}

						</TransitionGroup>

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={7} />
							</TableRow>
						)}

					</TableBody>

					{/* Rodapé da Tabela */}

					<TableFooter>
						<TableRow>
							<TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={7} count={stock!.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
						</TableRow>
					</TableFooter>

				</Table>
			</TableContainer>
		</div>
    )   
}

export default Visualizer