import { Supermarket } from "@/libs/types/Supermarket";
import { Box, Button, Card, CardContent, CardMedia, Grow, Typography } from "@mui/material";

const Unit = ({ supermarket }: { supermarket: Supermarket }) => {

	return (
		<Grow in={true} {...{ timeout: 1000 }}>
			<Card elevation={4} >
				{supermarket.imageUrl !== '' && <CardMedia
					sx={{ height: 200 }}
					image={supermarket.imageUrl}
					title={supermarket.name}
				/>}

				<Box sx={{ height: 180 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'fontWeightMedium' }}>
							{supermarket.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{supermarket.address}
						</Typography>
					</CardContent>
				</Box>

				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button
						variant="contained"
						size="small"
						sx={{
							backgroundColor: 'secondary.main',
							color: 'secondary.contrastText',
							'&:hover': {
								backgroundColor: 'secondary.dark',
							},
						}}
						href={`/app/supermarket/${supermarket.id}`}
					>
						Gerenciar
					</Button>
				</Box>

			</Card>
		</Grow>
	)
}

export default Unit;