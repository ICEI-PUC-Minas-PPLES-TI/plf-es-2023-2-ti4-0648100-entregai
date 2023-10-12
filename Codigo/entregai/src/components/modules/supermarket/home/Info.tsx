import { Supermarket } from "@/libs/types/Supermarket"

const Info = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <h1>{supermarket.name}</h1>
        </div>
    )
}

export default Info