import { useState } from "react";
import { Box, Fab, Grid, Divider, Button } from "@mui/material";
import Link from "next/link";
import Info from "../../modules/supermarket/home/Info";
import Edit from "../../modules/supermarket/home/Edit";
import Delete from "../../modules/supermarket/home/Delete";
import Upload from "@/components/modules/supermarket/home/Upload";
import BackButton from "@/components/misc/BackButton";
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Supermarket } from "@/libs/types/Supermarket";
import styles from './SupermarketHome.module.scss';


const SupermarketHome = ({ supermarket }: { supermarket: Supermarket }) => {

    const [supermarketDetails, setSupermarketDetails] = useState<Supermarket>(supermarket)

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <BackButton />

            <Grid container spacing={0} sx={{ maxWidth: 1100 }}>
                <Grid item lg={8}>
                    <Info supermarket={supermarketDetails} />
                </Grid>

                <Grid item lg={4}>
                    <div className={styles.actions}>
                        <Link href={`/app/supermarket/${supermarketDetails.id}/orders`}>
                            <Button variant="contained" size='large' startIcon={<DescriptionIcon />} sx={{ margin: '0.5rem', width: 240 }}>
                                Gerenciar pedidos
                            </Button>
                        </Link>

                        <Link href={`/app/supermarket/${supermarketDetails.id}/stock`}>
                            <Button variant="contained" size='large' startIcon={<InventoryIcon />} sx={{ margin: '0.5rem', width: 240 }}>
                                Gerenciar estoque
                            </Button>
                        </Link>

                    </div>
                </Grid>

            </Grid>

            <div className={styles.options}>
                <Upload setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
                <Edit setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
                <Delete supermarket={supermarketDetails} />
            </div>
        </Box>
    )
}

export default SupermarketHome