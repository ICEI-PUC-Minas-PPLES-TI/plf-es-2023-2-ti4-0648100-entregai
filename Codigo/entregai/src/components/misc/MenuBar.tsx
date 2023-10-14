import * as React from 'react';
import { AppBar, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/firebase/firebase-config";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";

const drawerWidth = 240;

const menuItems = [
	{ text: 'Supermercados', link: '/supermarket', icon: StorefrontOutlinedIcon },
	{ text: 'Usuários', link: '/user', icon: GroupOutlinedIcon },
];

const MenuBar = () => {

	const { replace } = useRouter();

	const userSignOut = async () => {
		await axios.patch('/api/login/auth', { token: getCookie('session') })
			.then(() => {

				deleteCookie('session')

				replace('/login')

				signOut(auth)
			})
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Entregaí
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					{/* Lista dinâmica conforme os itens de menuItems */}
					<List>
						{menuItems.map((item, index) => (
							<ListItem key={item.text} disablePadding> {/* Ex.: Supermercados */}
								<Link href={`/app/${item.link}`}> {/* Ex.: /app/supermarket */}
									<ListItemButton>
										<ListItemIcon>
											{<item.icon />}
										</ListItemIcon>
										<ListItemText primary={item.text} />
									</ListItemButton>
								</Link>
							</ListItem>
						))}
					</List>

					<Divider />

					<List>
						{/* Item "Meu Perfil" */}
						<ListItem>
							<Link href="/app/user/profile">
								<ListItemButton>
									<ListItemIcon>
										<PersonOutlineOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary="Meu Perfil" />
								</ListItemButton>
							</Link>
						</ListItem>

						{/* Item "Deslogar" */}
						<ListItem>
							<ListItemButton onClick={userSignOut}>
								<ListItemIcon>
									<ExitToAppOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="Sair" />
							</ListItemButton>
						</ListItem>

					</List>
				</Box>
			</Drawer>
		</Box>
	);
}

export default MenuBar;