import { useRouteError } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

const Error = () => {
	const err = useRouteError();
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
			<Paper
				sx={{
					padding: 10,
					width: '400px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				elevation={3}
			>
				<Typography component="h1" variant="h4" fontWeight={700} padding={2}>
					Oooppssss!!!
				</Typography>
				<Typography component="h1" variant="h5">
					Something went wrong!!
				</Typography>
				<Typography component="h1" variant="h5">
					{err.status}: {err.statusText}
				</Typography>
			</Paper>
		</div>
	);
};

export default Error;
