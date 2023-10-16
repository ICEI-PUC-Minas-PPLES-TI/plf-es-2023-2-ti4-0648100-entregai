import { Box, Grid } from '@mui/material';
import { Supermarket } from "@/libs/types/Supermarket";
import Registration from "../../modules/supermarket/management/Registration";
import Visualizer from "../../modules/supermarket/management/Visualizer";

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Registration />
                </Grid>
                {systemSupermarkets.map((supermarket, index) => (
                    <Grid item xs={2.4} key={index}>
                        <Visualizer systemSupermarkets={[supermarket]} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SupermarketManagement;