import { Supermarket } from "@/libs/types/Supermarket";
import SupermarketContainer from "../inner/SupermarketContainer";
import { useAuth } from "@/components/context/UserContext";
import { useEffect } from "react";

const SupermarketVisualizer = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    
    const { user } = useAuth()

    useEffect(() => {
        console.log(user.selectedSupermarkets);
    }, [ user.selectedSupermarkets ])

    // useEffect(() => {
    //     console.log(user.selectedSupermarkets);
    //     console.log(user.email);
        
        
    //     // systemSupermarkets.filter((supermarket) => {
    //     //     return (user.selectedSupermarkets.includes(supermarket.id) || user.permissionLevel)
    //     // })
    // }, [ systemSupermarkets, user.permissionLevel, user.selectedSupermarkets ])
    
    return (
        <div>
            {systemSupermarkets.map((supermarket) => (
                <SupermarketContainer 
                    key={supermarket.id}
                    supermarket={supermarket} 
                />
            ))}
        </div>
    )
}

export default SupermarketVisualizer;