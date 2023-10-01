import { Supermarket } from "../../../types/Supermarket"
import SupermarketDelete from "./modules/SupermarketDelete"
import SupermarketEdit from "./modules/SupermarketEdit"
import SupermarketInfo from "./modules/SupermarketInfo"

async function getSupermarket(id: string) {
    const response = await fetch(`${process.env.URL}/main/supermarket/api?supermarketId=${id}`, { next: { revalidate: 0 }, cache: 'no-store' })

    const { supermarket } = await response.json()

    return supermarket
}

const SupermarketHome = async ({ id }: { id: string }) => {

    const supermarket: Supermarket = await getSupermarket(id)

    return (
        <div>
            <SupermarketInfo supermarket={supermarket} />

            <SupermarketDelete supermarket={supermarket} />

            <SupermarketEdit supermarket={supermarket} />
        </div>
    )
}

export default SupermarketHome