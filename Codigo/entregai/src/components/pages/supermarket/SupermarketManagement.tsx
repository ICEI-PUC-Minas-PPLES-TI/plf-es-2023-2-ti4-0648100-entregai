import { Supermarket } from "@/libs/types/Supermarket";
import Registration from "./modules/management/Registration";
import Visualizer from "./modules/management/Visualizer";

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <Registration />

            <Visualizer systemSupermarkets={systemSupermarkets} />

        </div>
    )
}

export default SupermarketManagement;