import { Supermarket } from "@/libs/types/Supermarket"
import Picture from "./Picture"

const Info = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <h1>{supermarket.name}</h1>

            <Picture imageUrl={supermarket.imageUrl!} />

            <p>Endereço: {supermarket.address}</p>

            <p>Telefone: {supermarket.phone}</p>

            <p>CNPJ: {supermarket.cnpj}</p>
        </div>
    )
}

export default Info