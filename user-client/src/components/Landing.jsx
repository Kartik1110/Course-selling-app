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
		</div>
	);
}

export default Landing;
