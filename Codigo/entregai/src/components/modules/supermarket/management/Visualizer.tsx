import { Supermarket } from "@/libs/types/Supermarket";
import { useAuth } from "@/components/context/UserContext";
import Unit from "./Unit";
import { Grid } from "@mui/material";

const Visualizer = ({ supermarkets }: { supermarkets: Supermarket[] }) => {
    
    const { user } = useAuth()

    const filteredSupermarkets = supermarkets.filter((supermarket) => {
        return user.selectedSupermarkets?.includes(supermarket.id) || user.permissionLevel;
    });

    return (<>
        {filteredSupermarkets.map((supermarket) => (
            <Grid item xs={2.4} key={supermarket.id} sx={{ boxSizing: 'content-box', minWidth: 180, maxWidth: 300, height: 450 }} >
                <Unit supermarket={supermarket}/>
            </Grid>
        ))}
    </>)
}

export default Visualizer;