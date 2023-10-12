import { Supermarket } from "@/libs/types/Supermarket";
import { useAuth } from "@/components/context/UserContext";
import { useEffect } from "react";
import Unit from "./Unit";

const Visualizer = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    
    const { user } = useAuth()

    const filteredSupermarkets = systemSupermarkets.filter((supermarket) => {
        return user.selectedSupermarkets?.includes(supermarket.id) || user.permissionLevel;
    });

    return (
        <div>
            {filteredSupermarkets.map((supermarket) => (
                <Unit 
                    key={supermarket.id}
                    supermarket={supermarket} 
                />
            ))}
        </div>
    )
}

export default Visualizer;