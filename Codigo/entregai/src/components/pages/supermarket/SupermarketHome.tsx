import { useState } from "react";
import { Fab, Grid } from "@mui/material";
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
        <div>
            <BackButton />

            <Grid container spacing={1}>    {/* Outer grid */}
                <Grid item lg={8}>
                    <Info supermarket={supermarketDetails} />
                </Grid>

                <Grid item lg={4} className={styles.actions} >
                    <Grid container spacing={1}>    {/* Inner grid */}
                        <Grid item lg={12}>
                            <Upload setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
                        </Grid>
                        <Grid item lg={12}>
                            <Edit setSupermarketDetails={setSupermarketDetails} supermarket={supermarketDetails} />
                        </Grid>
                        <Grid item lg={12}>
                            <Delete supermarket={supermarketDetails} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg={12} className={styles.options}>
                    <Link href={`/app/supermarket/${supermarketDetails.id}/orders`}>
                        <Fab variant="extended" size="medium" color="primary" sx={{ marginTop: 2 }}>
                            <DescriptionIcon />
                            Pedidos
                        </Fab>
                    </Link>

                    <Link href={`/app/supermarket/${supermarketDetails.id}/stock`}>
                        <Fab variant="extended" size="medium" color="primary" sx={{ marginTop: 2 }}>
                            <InventoryIcon />
                            Estoque
                        </Fab>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default SupermarketHome