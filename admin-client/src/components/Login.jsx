import { useState } from 'react';
import axios from 'axios';
import { useForm } from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import {
	Snackbar,
	Button,
	Typography,
	Box,
	TextField,
	Paper,
	Alert,
} from '@mui/material';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
	const [formData, handleFormChange, resetFormData] = useForm({
		username: '',
		password: '',
	});
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:3000/admin/login',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						...formData,
					},
				}
			)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				setOpen(true);
				navigate('/courses');
			})
			.catch((error) => console.error(error));
		resetFormData();
	};

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
				<Typography component="h1" variant="h4">
					Login to admin dashboard
				</Typography>
				<Box
					component="form"
					sx={{
						mt: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						margin: '20px',
					}}
				>
					<TextField
						sx={{ margin: '20px' }}
						fullWidth={true}
						type="text"
						name="username"
						label="username"
						value={formData.username}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						fullWidth={true}
						type="password"
						name="password"
						label="password"
						value={formData.password}
						onChange={(e) => handleFormChange(e)}
					/>
				</Box>
				<div>
					<Button
						variant="contained"
						size="large"
						onClick={(e) => handleFormSubmit(e)}
					>
						Login
					</Button>
				</div>
				<br />
				<Typography component="h5" variant="h6">
					New here?
					<Button size="large" variant="outlined" sx={{ ml: 2 }}>
						<Link
							style={{ textDecoration: 'none', color: 'black' }}
							to="/register"
						>
							Register
						</Link>
					</Button>
				</Typography>
			</Paper>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success" sx={{ width: '100%' }}>
					Logged in successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}

export default Login;
