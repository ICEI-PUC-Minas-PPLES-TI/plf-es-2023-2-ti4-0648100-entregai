import { Supermarket } from "@/libs/types/Supermarket";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

const Unit = ({ supermarket }: { supermarket: Supermarket }) => {
    return (
		<div>
			<Card sx={{ maxWidth: 300 }}>

				{supermarket.imageUrl !== '' && <CardMedia
					sx={{ height: 150 }}
					image={supermarket.imageUrl}
					title={supermarket.name}
				/>}
				
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
						<Button size="small">Gerenciar</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
    )
}

export default Unit;