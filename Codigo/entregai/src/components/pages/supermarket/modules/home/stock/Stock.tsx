import { Supermarket } from "@/libs/types/Supermarket"
import Registration from "./Registration"
import Visualizer from "./Visualizer"

const Stock = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
        <div>
            <h1>Estoque</h1>

            <Registration supermarket={supermarket} />

            <Visualizer supermarket={supermarket} />
        </div>
    )
}

export default Stock