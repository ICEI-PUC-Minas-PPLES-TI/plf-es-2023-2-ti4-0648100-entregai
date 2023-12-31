import AppLayout from "@/components/layout/AppLayout";
import SupermarketOrders from "@/components/pages/supermarket/SupermarketOrders";
import { getSupermarketById } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const SupermarketOrdersPage = ({ supermarket }: { supermarket: Supermarket }) => {
  return (<SupermarketOrders supermarketInfo={supermarket} />)
}

SupermarketOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <AppLayout>
          {page}
      </AppLayout>
  )
}

// Trocar de any pra algum tipo ai
export async function getServerSideProps(context: any) {

  const id = context.params.id

  const supermarket: Supermarket = await getSupermarketById(id)

  return {
    props: {
      supermarket
    }
  }
}

export default SupermarketOrdersPage

