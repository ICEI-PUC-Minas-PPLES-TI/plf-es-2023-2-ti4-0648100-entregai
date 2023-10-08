import { AppBar, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/UserContext";
import BurguerDropdown from "./BurguerDropdown";

const MenuBar = () => {

	const { user } = useAuth()

	return (
		<div>
			<AppBar position="static">
				<Toolbar>

					<BurguerDropdown />

                    <Link href="/app/supermarket">
                        <Button variant="contained" color="darkred">
                            Supermercados
                        </Button>
                    </Link>

					{user.permissionLevel && <div>
						<Link href="/app/user">
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
