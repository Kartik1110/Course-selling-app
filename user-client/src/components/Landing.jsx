import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
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
