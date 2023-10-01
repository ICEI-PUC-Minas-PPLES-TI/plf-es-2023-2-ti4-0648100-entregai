'use client'

import { useUserData } from "@/components/context/UserDataContext";
import { Supermarket } from "../../../../types/Supermarket";
import SupermarketContainer from "./SupermarketContainer";

const SupermarketViewer = ({ supermarkets }: { supermarkets: Supermarket[] }) => {

    const userData = useUserData()

    const filteredSupermarkets = supermarkets.filter((supermarket) =>
        userData.selectedSupermarkets.includes(supermarket.id)
    );

    return (
        <div>
            {filteredSupermarkets.map((supermarket) => (
                <SupermarketContainer key={supermarket.id} supermarket={supermarket} />
            ))}
        </div>
	);
}

export default SupermarketViewer