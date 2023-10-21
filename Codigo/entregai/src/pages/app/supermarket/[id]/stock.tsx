import AppLayout from "@/components/layout/AppLayout";
import SupermarketStock from "@/components/pages/supermarket/SupermarketStock";
import { getSupermarketById } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const SupermarketStockPage = ({ supermarket }: { supermarket: Supermarket }) => {
  return (<SupermarketStock supermarket={supermarket} />)
}

SupermarketStockPage.getLayout = function getLayout(page: ReactElement) {
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

export default SupermarketStockPage

