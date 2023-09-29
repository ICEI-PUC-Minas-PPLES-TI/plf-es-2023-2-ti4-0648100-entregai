import { Supermarket } from "@/types/Supermarket";

const SupermarketInfo = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <h1>{supermarket.name}</h1>
        </div>
    )
}

export default SupermarketInfo