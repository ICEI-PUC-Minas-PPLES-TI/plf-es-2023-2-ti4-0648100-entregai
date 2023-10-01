import { Supermarket } from "../../../../types/Supermarket";
import SupermarketContainer from "./SupermarketContainer";

async function getSupermarkets() {
    const response = await fetch(process.env.URL + '/main/supermarket/api/all', { cache: 'no-store' })

    const { supermarkets } = await response.json()

    return supermarkets
}

const SupermarketViewer = async () => {

    const supermarkets: Supermarket[] = await getSupermarkets()

    return (
        <div>
            {supermarkets.map((supermarket) => (
                <SupermarketContainer key={supermarket.id} supermarket={supermarket} />
            ))}
        </div>
	);
}

export default SupermarketViewer