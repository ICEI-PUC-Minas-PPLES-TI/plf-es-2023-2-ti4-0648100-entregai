'use client'

import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import { User } from "../../../../types/User";
import { Supermarket } from "@/types/Supermarket";

const UserViewer = ({ users, supermarkets }: { users: User[], supermarkets: Supermarket[] }) => {

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

    const handleChangePage = (event: React.MouseEvent | null, newPage: number) => {
         setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const columns = [
        { id: 'name', label: 'Nome', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'permission', label: 'Permissão', minWidth: 100 },
        { id: 'editar', label: 'Gerenciar', minWidth: 5 },
    ]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align="left"
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                        ).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell align="left">{user.name}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{(user.permissionLevel ? "ADMIN" : "USER")}</TableCell>
                                <TableCell align="center">
                                    <UserEdit user={user} supermarkets={supermarkets} />
                                    <UserDelete user={user} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                </TableBody>
            
                <TableFooter>
                    <TableRow>
                        <TablePagination 
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={4}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default UserViewer