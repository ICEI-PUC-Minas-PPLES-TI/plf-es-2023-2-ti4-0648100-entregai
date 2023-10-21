import { Box, Grid } from '@mui/material';
import { Supermarket } from "@/libs/types/Supermarket";
import Registration from "../../modules/supermarket/management/Registration";
import Visualizer from "../../modules/supermarket/management/Visualizer";
import { useState } from 'react';

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {
    
    const [ supermarkets, setSupermarkets ] = useState<Supermarket[]>(systemSupermarkets)

    return (
        <Box>
            <Grid container spacing={4}>
                
                <Registration setSupermarkets={setSupermarkets} />
                
                <Visualizer supermarkets={supermarkets} />
                
            </Grid>
        </Box>
    );
}
export default SupermarketManagement;