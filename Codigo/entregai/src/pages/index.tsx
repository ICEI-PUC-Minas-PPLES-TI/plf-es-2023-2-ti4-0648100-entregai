import ClientLayout from "@/components/layout/ClientLayout";
import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

const ClientMainPage = () => {
    return (
        <div>

            <h1>Bem-Vindo ao Entregai</h1>

            <Link href="/order">
                <Button variant="contained" color="primary">Fazer Pedido</Button>
            </Link>

            <Link href="/track">
                <Button variant="contained" color="primary">Acompanhar Pedido</Button>
            </Link>

            {/* Criar um rodapé e colocar lá */}
            <Link href="/login">Painel</Link>

        </div>
    )
}

ClientMainPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <ClientLayout>

          {page}

      </ClientLayout>
  )
}

export default ClientMainPage
  
  