import { useState } from "react";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import {
	Paper,
	Typography,
	Box,
	TextField,
	Button,
	Snackbar,
	Alert
} from "@mui/material";

function Register() {
	const [formData, handleFormChange, resetFormData] = useForm({
		username: "",
		password: ""
	});
	/* This is used to set data for SnackBar component  */
	const [snackBar, setSnackBar] = useState({
		open: false,
		severity: "success",
		msg: ""
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/users/signup", formData)
			.then((data) => {
				setSnackBar({
					open: true,
					msg: data.data.message,
					severity: "success"
				});
			})
			.catch((error) => {
				setSnackBar({
					open: true,
					msg: error.response.data.message,
					severity: "error"
				});
			});
		resetFormData();
	};

	return (
		<div
			style={{
				height: "90vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Paper
				sx={{
					padding: 10,
					width: "400px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center"
				}}
				elevation={3}
			>
				<Typography component="h1" variant="h4">
					Register to the website
				</Typography>
				<Box
					component="form"
					sx={{
						mt: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						margin: "20px"
					}}
				>
					<TextField
						sx={{ margin: "20px" }}
						fullWidth={true}
						type="text"
						name="username"
						value={formData.username}
						label="username"
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						fullWidth={true}
						type="password"
						name="password"
						value={formData.password}
						label="password"
						onChange={(e) => handleFormChange(e)}
					/>
				</Box>
				<div>
					<Button variant="contained" onClick={(e) => handleFormSubmit(e)}>
						Create account
					</Button>
				</div>
				<br />
				<Typography component="h5" variant="h6">
					Already a user?
					<Button variant="outlined" sx={{ ml: 2 }}>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to="/login"
						>
							Login
						</Link>
					</Button>
				</Typography>
			</Paper>
			<Snackbar
				open={snackBar.open}
				autoHideDuration={6000}
				onClose={() => setSnackBar({ open: false })}
			>
				<Alert severity={snackBar.severity} sx={{ width: "100%" }}>
					{snackBar.msg}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default Register;
