import AppLayout from "@/components/layout/AppLayout";
import SupermarketManagement from "@/components/pages/supermarket/SupermarketManagement";
import { getAllSupermarkets } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const SupermarketsMainPage = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
  return (<SupermarketManagement systemSupermarkets={systemSupermarkets} />)
}

SupermarketsMainPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <AppLayout>
          {page}
      </AppLayout>
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

export default SupermarketsMainPage

