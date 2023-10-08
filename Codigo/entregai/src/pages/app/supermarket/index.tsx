import AppLayout from "@/components/layout/AppLayout";
import SupermarketManagement from "@/components/pages/supermarket/SupermarketManagement";
import { getAllSupermarkets } from "@/libs/firebase/supermarketHandler";
import { Supermarket } from "@/libs/types/Supermarket";
import { ReactElement } from "react";

const SupermarketsPage = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
  return (<SupermarketManagement systemSupermarkets={systemSupermarkets} />)
}

SupermarketsPage.getLayout = function getLayout(page: ReactElement) {
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

export default SupermarketsPage

