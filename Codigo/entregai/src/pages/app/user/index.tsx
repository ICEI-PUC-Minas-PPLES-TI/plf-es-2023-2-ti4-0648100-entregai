import ProtectedRoute from "@/components/context/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import UserManagement from "@/components/pages/user/UserManagement";
import { getAllSupermarkets } from "@/libs/handler/supermarketHandler";
import { getAllUsers } from "@/libs/handler/userHandler";
import { Supermarket } from "@/libs/types/Supermarket";
import { User } from "@/libs/types/User";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const UsersPage = ({ systemSupermarkets, systemUsers }: { systemSupermarkets: Supermarket[], systemUsers: User[] }) => {
    return (<UserManagement systemUsers={systemUsers} systemSupermarkets={systemSupermarkets} />)
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <ProtectedRoute>

            <AppLayout>

                {page}

            </AppLayout>

        </ProtectedRoute>
    )
}

export async function getServerSideProps() {

    const systemSupermarkets: Supermarket[] = await getAllSupermarkets() 

    const systemUsers: User[] = await getAllUsers()

	return {
		props: {
			systemSupermarkets,
            systemUsers
		}
	}
}

export default UsersPage
  
  