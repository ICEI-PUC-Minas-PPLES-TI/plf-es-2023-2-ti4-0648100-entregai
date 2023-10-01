import SupermarketCreator from "./modules/SupermarketRegistration"
import SupermarketViewer from "./modules/SupermarketViewer"

const SupermarketManagement = () => {

    return (
			<div>
                <SupermarketCreator />

                <SupermarketViewer />
			</div>
		);
}

export default SupermarketManagement