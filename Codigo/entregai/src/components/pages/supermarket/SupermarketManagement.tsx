import { Supermarket } from "@/types/Supermarket"
import SupermarketRegistration from "./modules/SupermarketRegistration"
import SupermarketViewer from "./modules/SupermarketViewer"

async function getSupermarkets() {
    const response = await fetch(`${process.env.URL}/main/supermarket/api/all`, { cache: 'no-store' })

    const { supermarkets } = await response.json()

    return supermarkets
}

const SupermarketManagement = async () => {
    
    const supermarkets: Supermarket[] = await getSupermarkets()

    return (
			<div>
                <SupermarketRegistration />

                <SupermarketViewer supermarkets={supermarkets} />
			</div>
		);
}

export default SupermarketManagement