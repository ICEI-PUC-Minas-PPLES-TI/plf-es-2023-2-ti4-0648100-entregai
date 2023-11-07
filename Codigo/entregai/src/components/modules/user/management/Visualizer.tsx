import { Supermarket } from "@/libs/types/Supermarket";
import { User } from "@/libs/types/User";
import { Box, Collapse, Fade, Grow, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Zoom } from "@mui/material";
import { useState } from "react";
import Edit from "./Edit";
import Delete from "./Delete";
import { TransitionGroup } from "react-transition-group";

const columns = [
	{ id: 'name', label: 'Nome', minWidth: 100 },
	{ id: 'email', label: 'Email', minWidth: 100 },
	{ id: 'permission', label: 'Permissão', minWidth: 100 },
	{ id: 'supermarkets', label: 'Supermercados', minWidth: 100 },
	{ id: 'editar', label: 'Gerenciar', minWidth: 5 },
]

const Visualizer = ({ users, setUsers, systemSupermarkets }: { users: User[], setUsers: Function, systemSupermarkets: Supermarket[] }) => {

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

	function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<TableContainer component={Paper} sx={{ margin: '1.5rem 0', maxWidth: '98%' }}>

			<Table sx={{ minWidth: 400 }}>

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

						{(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user) => (

							<Fade in key={user.id}>

								<TableRow>

									<TableCell align="left">{user.name}</TableCell>

									<TableCell align="left">{user.email}</TableCell>

									<TableCell align="left">{user.permissionLevel ? "ADMINISTRADOR" : "USUÁRIO"}</TableCell>

									<TableCell align="left">
										{user.selectedSupermarkets
											.map((supermarketId) => {
												const supermarket = systemSupermarkets.find((sup) => sup.id === supermarketId);
												return supermarket ? supermarket.name : "";
											})
											.join(", ")}
									</TableCell>

									<TableCell align="center" sx={{ display: 'flex', alignItems: 'center' }}>
										<div>
											<Edit targetUser={user} setUsers={setUsers} systemSupermarkets={systemSupermarkets} />
										</div>
										<div>
											<Delete targetUser={user} setUsers={setUsers} />
										</div>
									</TableCell>
								</TableRow>

							</Fade>

						))}

					</TransitionGroup>

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={5} />
						</TableRow>
					)}

				</TableBody>

				{/* Rodapé da Tabela */}

				<TableFooter>
					<TableRow>
						<TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={5} count={users.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
					</TableRow>
				</TableFooter>

			</Table>
		</TableContainer>
	);
};

export default Visualizer;
