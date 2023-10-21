import { Box, Grid, Typography } from '@mui/material';
import { Supermarket } from "@/libs/types/Supermarket";
import Registration from "../../modules/supermarket/management/Registration";
import Visualizer from "../../modules/supermarket/management/Visualizer";
import { useState } from 'react';
import LazyPage from '@/libs/lazy/Lazy';
import dynamic from 'next/dynamic';

const SupermarketManagement = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const [supermarkets, setSupermarkets] = useState<Supermarket[]>(systemSupermarkets)

    return (
        <Box>
            <Typography variant="h4" noWrap component="div" sx={{ padding: '0 0 1.5rem 0' }}>
                Gerenciar supermercados
            </Typography>

            <Grid container spacing={4}>

                <Registration setSupermarkets={setSupermarkets} />

                <Visualizer supermarkets={supermarkets} />

            </Grid>
        </Box>
    );
}
export default SupermarketManagement;