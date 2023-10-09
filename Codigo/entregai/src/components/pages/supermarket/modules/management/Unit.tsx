import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const Unit = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
		<div>
			<Card sx={{ maxWidth: 300 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{supermarket.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{supermarket.address}
					</Typography>
				</CardContent>
				<CardActions>
					<Link href={`/app/supermarket/${supermarket.id}`}>
						<Button size="small">Ver mais</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
    )
}

export default Unit;