import { Supermarket } from "../../../../types/Supermarket";
import SupermarketContainer from "./SupermarketContainer";

const SupermarketViewer = ({ supermarketsArray }: { supermarketsArray: Supermarket[] }) => {

    return (
        <div>
            {supermarketsArray.map((supermarket) => (
                <SupermarketContainer key={supermarket.id} supermarket={supermarket} />
            ))}
        </div>
	);
}

export default SupermarketViewer