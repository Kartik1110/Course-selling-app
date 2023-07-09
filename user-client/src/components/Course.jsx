import {
	Typography,
	Button,
	Card,
	CardActionArea,
	CardMedia,
	CardActions,
	CardContent,
} from '@mui/material';

function Course(props) {
	// eslint-disable-next-line react/prop-types
	const { title, description, price, imageLink } = props.courses;
	const { onBuyClick, btnText } = props;
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
			}}
		>
			<Card sx={{ width: 350, height: 400, margin: 5, position: 'relative' }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image={imageLink}
						alt="Course images"
					/>
					<CardContent>
						<Typography
							gutterBottom
							component="h1"
							variant="h5"
							fontWeight={700}
						>
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary" component="h3">
							{description}
						</Typography>
						<Typography component="p" variant="h6">
							Rs. {price}/-
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
					<Button variant="contained" color="primary" onClick={onBuyClick}>
						{btnText}
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default Course;
