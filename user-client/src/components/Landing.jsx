import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

function Landing() {
	return (
		<div
			style={{
				height: '90vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<img
				style={{ width: '100%', height: '90vh', position: 'absolute' }}
				src={'../../src/assets/course-landing.jpg'}
				alt="course-landing"
			/>

			<Typography
				style={{
					position: 'relative',
					fontWeight: '800',
					fontSize: '15vh',
					color: 'white',
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
				}}
				component="h1"
				variant="h3"
			>
				Welcome to CourseX !
			</Typography>
			<Typography
				style={{
					position: 'relative',
					fontWeight: '600',
					fontSize: '5vh',
					color: 'white',
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
				}}
				component="h1"
				variant="h3"
			>
				Fuel you ambitions !
			</Typography>
			{/* <Typography component="h5" variant="h6">
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
			</Typography> */}
		</div>
	);
}

export default Landing;
