import AppLayout from "@/components/layout/AppLayout";
import SupermarketHome from "@/components/pages/supermarket/SupermarketHome";
import { getSupermarketById, getSupermarketImageUrl } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const SupermarketDetailsPage = ({ supermarket }: { supermarket: Supermarket }) => {
  return (<SupermarketHome supermarket={supermarket} />)
}

SupermarketDetailsPage.getLayout = function getLayout(page: ReactElement) {
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

  supermarket.imageUrl = await getSupermarketImageUrl(id)

  return {
    props: {
      supermarket
    }
  }
}

export default SupermarketDetailsPage

