import ClientLayout from "@/components/layout/ClientLayout";
import Tracking from "@/components/pages/order/Tracking";
import { Button } from "@mui/material";
import { ReactElement } from "react";

const ClientTrackPage = () => {
    return (<Tracking />)
}

ClientTrackPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <ClientLayout>

            {page}

        </ClientLayout>
    )
}

export default ClientTrackPage
  
  