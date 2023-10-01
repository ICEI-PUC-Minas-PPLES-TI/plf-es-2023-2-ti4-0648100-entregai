import { Supermarket } from "../../../types/Supermarket"
import SupermarketInfo from "./modules/SupermarketInfo"

async function getSupermarket(id: string) {
    const response = await fetch(process.env.URL + `/main/supermarket/api?supermarketId=${id}`, { cache: 'no-store' })

    const { supermarket } = await response.json()

    return supermarket
}

const SupermarketHome = async ({ id }: { id: string }) => {

    const supermarket: Supermarket = await getSupermarket(id)

    return (
        <div>
            <SupermarketInfo supermarket={supermarket} />
        </div>
    )
}

export default SupermarketHome