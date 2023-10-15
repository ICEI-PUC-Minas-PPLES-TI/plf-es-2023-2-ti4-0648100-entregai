import ClientLayout from "@/components/layout/ClientLayout";
import Order from "@/components/pages/order/Order";
import { getAllSupermarkets } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const ClientOrderPage = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    return (<Order systemSupermarkets={systemSupermarkets} />)
}

ClientOrderPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <ClientLayout>

            {page}

        </ClientLayout>
    )
}

export async function getServerSideProps() {

    const systemSupermarkets: Supermarket[] = await getAllSupermarkets() 
  
    return {
        props: {
            systemSupermarkets
        }
    }
}

export default ClientOrderPage
  
  