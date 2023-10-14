import ClientLayout from "@/components/layout/ClientLayout";
import Track from "@/components/pages/track/Track";
import { ReactElement } from "react";

const ClientTrackPage = () => {
    return (<Track />)
}

ClientTrackPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <ClientLayout>

            {page}

        </ClientLayout>
    )
}

export default ClientTrackPage
  
  