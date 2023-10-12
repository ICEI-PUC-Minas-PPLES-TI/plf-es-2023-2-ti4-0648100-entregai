import { Supermarket } from "@/libs/types/Supermarket";
import Registration from "../../modules/supermarket/management/Registration";
import Visualizer from "../../modules/supermarket/management/Visualizer";

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <Registration />

            <Visualizer systemSupermarkets={systemSupermarkets} />

        </div>
    )
}

export default SupermarketManagement;