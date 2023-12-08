import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image'
import { Box, Drawer, List, Typography, Divider } from '@mui/material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
	StorefrontOutlined as StorefrontOutlinedIcon,
	GroupOutlined as GroupOutlinedIcon,
	PersonOutlineOutlined as PersonOutlineOutlinedIcon,
	ExitToAppOutlined as ExitToAppOutlinedIcon,
} from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/libs/firebase/firebase-config';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import { useAuth } from '../context/UserContext';
import logo from "/src/styles/img/entregai_logo_white.png"


const drawerWidth = 240;

const menuItems = [
	{ text: 'Supermercados', link: 'supermarket', icon: StorefrontOutlinedIcon },
	{ text: 'Usuários', link: 'user', icon: GroupOutlinedIcon },
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

	const { user } = useAuth()

	return (
		<Box sx={{ display: 'flex' }} >
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none'}}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Image src={logo} alt="Entregaí" height={40} />

					<Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'fontWeightMedium' }}>
						Olá, {user.name} 
					</Typography>
				</Toolbar>
			</AppBar >
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'background.dark', },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					{/* Lista dinâmica conforme os itens de menuItems */}
					<List>
						{menuItems.map((item, index) => (
							<Link href={`/app/${item.link}`} key={item.text}>
							<ListItem  disablePadding> {/* Ex.: Supermercados */}
								 {/* Ex.: /app/supermarket */}
									<ListItemButton>
										<ListItemIcon sx={{ color: 'primary.contrastText' }}>
											{<item.icon />}
										</ListItemIcon>
										<ListItemText primary={item.text} sx={{ color: 'primary.contrastText' }} />
									</ListItemButton>
							</ListItem>
							</Link>
						))}
					</List>

					<Divider sx={{ backgroundColor: 'primary.contrastText' }} />

					<List>
						{/* Item "Meu Perfil" */}
						<Link href="/app/user/profile">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon sx={{ color: 'primary.contrastText' }}>
										<PersonOutlineOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary="Meu Perfil" sx={{ color: 'primary.contrastText' }} />
								</ListItemButton>
							</ListItem>
						</Link>

						{/* Item "Deslogar" */}
						<ListItemButton onClick={userSignOut}>
							<ListItem disablePadding>
								<ListItemIcon sx={{ color: 'primary.contrastText' }}>
									<ExitToAppOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="Sair" sx={{ color: 'primary.contrastText' }} />
							</ListItem>
						</ListItemButton>
					</List>
				</Box>
			</Drawer>
		</Box>
	);
}

export default MenuBar;