import { UserDataProvider } from "@/components/context/UserDataContext";
import MenuBar from "@/components/misc/MenuBar";

export default function MainLayout({ children }) {
	return (
        <div>
			<UserDataProvider>

				<MenuBar />

				{children}

			</UserDataProvider>
		</div>
	);
}
