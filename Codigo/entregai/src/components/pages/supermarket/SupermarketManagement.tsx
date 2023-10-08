import { Supermarket } from "@/libs/types/Supermarket";
import SupermarketRegistration from "./modules/outer/SupermarketRegistration";
import SupermarketVisualizer from "./modules/outer/SupermarketVisualizer";

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    return (
        <div>

            <SupermarketRegistration />

            <SupermarketVisualizer systemSupermarkets={systemSupermarkets} />

        </div>
    )
}

export default SupermarketManagement;