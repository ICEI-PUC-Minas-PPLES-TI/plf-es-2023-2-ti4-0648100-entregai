import { AppBar, Button, Toolbar } from "@mui/material";
import { useUserData } from "../context/UserDataContext";
import BurguerMenu from "./BurguerMenu";
import Link from "next/link";

const MenuBar = () => {

	const {userData} = useUserData();

	return (
		<div>
			<AppBar position="static">
				<Toolbar>

					<BurguerMenu />

                    <Link href="/main/supermarket">
                        <Button variant="contained" color="darkred">
                            Supermercados
                        </Button>
                    </Link>

					{userData.permissionLevel && <div>
						<Link href="/main/user">
							<Button variant="contained" color="darkred">
								Usuarios
							</Button>
						</Link>
					</div>}

				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MenuBar;
