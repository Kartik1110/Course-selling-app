import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				height: '10vh',
				backgroundColor: 'white',
				boxShadow: '2px 2px 4px #00000080',
			}}
		>
			<div>
				<Typography sx={{ margin: 2 }} variant="h4">
					<Link style={{ textDecoration: 'none', color: 'black' }} to="/">
						CourseX
					</Link>
				</Typography>
			</div>
			{token ? (
				<Button
					variant="contained"
					sx={{ margin: 2 }}
					color="warning"
					onClick={handleLogout}
				>
					<Link
						style={{ textDecoration: 'none', color: 'white' }}
						to="/register"
					>
						Logout
					</Link>
				</Button>
			) : (
				<div>
					<Button variant="contained" sx={{ margin: 2 }}>
						<Link
							style={{ textDecoration: 'none', color: 'white' }}
							to="/register"
						>
							Register
						</Link>
					</Button>
					<Button sx={{ margin: 2 }} variant="outlined">
						<Link
							style={{ textDecoration: 'none', color: '#1976d2' }}
							to="/login"
						>
							Sign in
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}

export default Navbar;
