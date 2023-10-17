import { Supermarket } from "@/libs/types/Supermarket";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const Unit = ({ supermarket }: { supermarket: Supermarket }) => {
	return (
		<div>
			<Card sx={{ maxWidth: 300 }}>

				{supermarket.imageUrl !== '' && <CardMedia
					sx={{ height: 200 }}
					image={supermarket.imageUrl}
					title={supermarket.name}
				/>}

				<CardContent>
					<Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'fontWeightMedium' }}>
						{supermarket.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{supermarket.address}
					</Typography>
				</CardContent>
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button
						sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
						variant="contained"
						size="small"
						href={`/app/supermarket/${supermarket.id}`}
					>
						Gerenciar
					</Button>
				</Box>
			</Card>
		</div>
	)
}

export default Unit;