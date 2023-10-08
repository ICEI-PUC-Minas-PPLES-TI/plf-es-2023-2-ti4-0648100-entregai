import { Supermarket } from "@/libs/types/Supermarket";
import { User } from "@/libs/types/User";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import UserEdit from "../inner/UserEdit";
import UserDelete from "../inner/UserDelete";

const columns = [
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'permission', label: 'Permissão', minWidth: 100 },
    { id: 'supermarkets', label: 'Supermercados', minWidth: 100},
    { id: 'editar', label: 'Gerenciar', minWidth: 5 },
]

const UserVisualizer = ({ systemUsers, systemSupermarkets }: { systemUsers: User[], systemSupermarkets: Supermarket[] }) => {

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - systemUsers.length) : 0

    function handleChangePage(event: React.MouseEvent | null, newPage: number) { setPage(newPage) }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

	return (
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
					
                    {(rowsPerPage > 0 ? systemUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : systemUsers).map((user) => (
						
                        <TableRow key={user.id}>
							
                            <TableCell align="left">{user.name}</TableCell>

							<TableCell align="left">{user.email}</TableCell>

							<TableCell align="left">{user.permissionLevel ? "ADMIN" : "USER"}</TableCell>
							
                            <TableCell align="left">
								{user.selectedSupermarkets
									.map((supermarketId) => {
										const supermarket = systemSupermarkets.find((sup) => sup.id === supermarketId);
										return supermarket ? supermarket.name : "";
									})
									.join(", ")}
						    </TableCell>

							<TableCell align="center">

								<UserEdit targetUser={user} systemSupermarkets={systemSupermarkets} />
								
                                <UserDelete targetUser={user} />

							</TableCell>

						</TableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={5} />
						</TableRow>
					)}

				</TableBody>

				{/* Rodapé da Tabela */}

				<TableFooter>
					<TableRow>
						<TablePagination rowsPerPageOptions={[5, 10, 25]} colSpan={5} count={systemUsers.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
					</TableRow>
				</TableFooter>

			</Table>
		</TableContainer>
	);
};

export default UserVisualizer;
