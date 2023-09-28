import SupermarketContainer from "./SupermarketContainer";

const SupermarketViewer = ({ supermarketsArray }) => {

    return (
        <div>
            {supermarketsArray.map((supermarket) => (
                <SupermarketContainer key={supermarket.id} supermarket={supermarket} />
            ))}
        </div>
	);
}

export default SupermarketViewer