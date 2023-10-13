import AppLayout from "@/components/layout/AppLayout";
import SupermarketHome from "@/components/pages/supermarket/SupermarketHome";
import SupermarketManagement from "@/components/pages/supermarket/SupermarketManagement";
import { getAllSupermarkets, getSupermarketById, getSupermarketImage } from "@/libs/handler/supermarketHandler";
import { Supermarket } from "@/libs/types/Supermarket";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const SupermarketDetailsPage = ({ supermarket, imageUrl }: { supermarket: Supermarket, imageUrl: string }) => {
  return (<SupermarketHome imageUrl={imageUrl} supermarket={supermarket} />)
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

  const imageUrl: string = await getSupermarketImage(id)

  return {
    props: {
      supermarket,
      imageUrl
    }
  }
}

export default SupermarketDetailsPage

