import { Supermarket } from "@/libs/types/Supermarket"
import { TextField, Autocomplete, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import Edit from "./Edit";
import { Product } from "@/libs/types/Product";
import Delete from "./Delete";

const columns = [
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'price', label: 'Preço', minWidth: 100 },
    { id: 'stockQuantity', label: 'Quantidade em Estoque', minWidth: 100 },
    { id: 'soldQuantity', label: 'Quantidade Vendida', minWidth: 100},
    { id: 'profit', label: 'Lucro Total', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100 },
]

const Visualizer = ({ supermarket }: { supermarket: Supermarket }) => {

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)
	const [ stock, setStock ] = useState(supermarket.stock)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - supermarket.stock.length) : 0

    function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

	function search(searchString: string) {

		if (page !== 0) {
			setPage(0)
		}

		const filteredRows = supermarket.stock.filter((stockItem) => {
			return stockItem.name.toLowerCase().includes(searchString.toLowerCase())
		})

		setStock(filteredRows)
	}

    return (    
		<div>

			<TextField onChange={(event) => { search(event.target.value) }} label="Busca Item por Nome" />

			<TableContainer component={Paper}>

				<Table sx={{ minWidth: 500 }}>

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
						
						{(rowsPerPage > 0 ? stock.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : stock).map((stockItem: Product) => (
							
							// Colocar uma key VALIDA aqui, alterar o objeto "Product" para ter uma key, senão o react reclama
							<TableRow key={stockItem.name}>
								
								<TableCell align="left">{stockItem.name}</TableCell>

								<TableCell align="left">{stockItem.price}</TableCell>

								<TableCell align="left">{stockItem.stockQuantity}</TableCell>

								<TableCell align="center"></TableCell>

								<TableCell align="center"></TableCell>

								<TableCell align="center">

									<Edit supermarket={supermarket} product={stockItem}/>

									<Delete supermarket={supermarket} product={stockItem}/>

								</TableCell>

							</TableRow>
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}

					</TableBody>

					{/* Rodapé da Tabela */}

					<TableFooter>
						<TableRow>
							<TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={5} count={stock.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
						</TableRow>
					</TableFooter>

				</Table>
			</TableContainer>
		</div>
    )   
}

export default Visualizer