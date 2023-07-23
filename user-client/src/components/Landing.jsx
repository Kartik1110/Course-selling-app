import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

function Landing() {
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Typography component="h1" variant="h3">
				Welcome to CourseX !
			</Typography>

			<Typography component="h5" variant="h6">
				New here?
				<Button sx={{ margin: 2 }} variant="contained">
					<Link
						style={{ textDecoration: 'none', color: 'black' }}
						to="/register"
					>
						Register
					</Link>
				</Button>
			</Typography>
			<Typography component="h5" variant="h6">
				Already a user?
				<Button sx={{ margin: 2 }} variant="contained">
					<Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
						login
					</Link>
				</Button>
			</Typography>
		</div>
	);
}

export default Landing;
