import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/libs/firebase/firebase-config";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";

const BurguerDropdown = () => {

	const { replace } = useRouter();
	const [ anchorElevation, setAnchorElevation ] = useState<Element | null>(null);

    const userSignOut = async () => {

		await axios.patch('/api/login/auth', { token: getCookie('session') })
			.then(() => {
				
				deleteCookie('session')

				replace('/')

				signOut(auth)
			})
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
				<Link href="/app/user/profile">
					<MenuItem>Perfil</MenuItem>
				</Link>

				<MenuItem onClick={userSignOut}>Deslogar</MenuItem>
			</Menu>
		</div>
	);
};

export default BurguerDropdown;
