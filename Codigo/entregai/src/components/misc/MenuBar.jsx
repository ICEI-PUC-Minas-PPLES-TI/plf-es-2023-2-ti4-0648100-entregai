"use client";

import { auth } from "@/firebase/firebase";
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { signOut } from "firebase/auth";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import styles from './MenuBar.module.scss'
import { useUserData } from "../context/UserDataContext";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../app/theme';

const MenuBar = () => {
	const [user] = useAuthState(auth);
	const { push } = useRouter();
	const {authUser} = useUserData();

	const [anchorEl, setAnchorEll] = useState(null);

	const userSignOut = () => {
		signOut(auth).then(() => {
			push("/");
		});
	};

	const handleToggle = (event) => {
		if (anchorEl) {
			setAnchorEll(null);
		} else {
			setAnchorEll(event.currentTarget);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" onClick={handleToggle} color="inherit">
						<MenuIcon />
					</IconButton>

                    <Link href="/main">
                        <Button variant="contained" color="primary">
                            Supermercados
                        </Button>
                    </Link>

					{authUser.permission == 1 && <div>
						<Link href="/main/register">
							<Button variant="contained" color="primary">
								Cadastro
							</Button>
						</Link>
					</div>}

					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleToggle}
					>
						<Link href="/main/profile" className={styles.link}><MenuItem>Perfil</MenuItem></Link>
						<MenuItem onClick={userSignOut}>Deslogar</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			</div>
		</ThemeProvider>
	);
};

export default MenuBar;
