"use client";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./BurguerMenu.module.scss";

const BurguerMenu = () => {

	const { push } = useRouter();
	const [ anchorElevation, setAnchorElevation ] = useState<Element | null>(null);

    const userSignOut = () => {
		signOut(auth).then(() => {
			push("/");
		});
	};

	const handleToggle = (event: React.MouseEvent) => {
		if (anchorElevation) {
			setAnchorElevation(null);
		} else {
			setAnchorElevation(event.currentTarget)
		}
	}

	return (
		<div>
			<IconButton size="large" onClick={handleToggle} color="inherit">
				<MenuIcon />
			</IconButton>

			<Menu
				id="menu-appbar"
				anchorEl={anchorElevation}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				keepMounted
				open={Boolean(anchorElevation)}
				onClose={handleToggle}
			>
				<Link href="/main/user/profile" className={styles.link}>
					<MenuItem>Perfil</MenuItem>
				</Link>

				<MenuItem onClick={userSignOut}>Deslogar</MenuItem>
			</Menu>
		</div>
	);
};

export default BurguerMenu;
