import {
	Typography,
	Button,
	Card,
	CardActionArea,
	CardMedia,
	CardActions,
	CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function Course(props) {
	// eslint-disable-next-line react/prop-types
	const { id, title, description, price, imageLink, published } = props.courses;
	// eslint-disable-next-line react/prop-types
	const { editable } = props;
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
						<Typography component="a" variant="h6">
							Rs. {price}/-
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
					{editable && (
						<Link
							to={`/course/${id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<EditIcon
								style={{
									cursor: 'pointer',
									fontSize: 24,
									color: '#0288d1',
									marginRight: 15,
								}}
							/>
						</Link>
					)}
					<Button variant={published ? 'contained' : 'outlined'} color="info">
						{published ? 'published' : 'unpublished'}
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default Course;
