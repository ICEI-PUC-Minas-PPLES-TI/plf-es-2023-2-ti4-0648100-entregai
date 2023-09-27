'use client'

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const SupermarketViewer = ({ supermarketsArray }) => {

    return (
        <div>
            {supermarketsArray.map((supermarket) => (
                <Card key={supermarket.id} sx={{ maxWidth: 300 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {supermarket.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {supermarket.address}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href={`/main/supermarket/${supermarket.id}`}>
                            <Button size="small">Ver mais</Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </div>
	);
}

export default SupermarketViewer