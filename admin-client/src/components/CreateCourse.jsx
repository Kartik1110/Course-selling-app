import axios from 'axios';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import {
	Paper,
	Typography,
	Box,
	TextField,
	Button,
	Snackbar,
	Alert,
	Checkbox,
	FormControlLabel,
} from '@mui/material';

function CreateCourse() {
	const [formData, handleFormChange, resetFormData] = useForm({
		title: '',
		description: '',
		price: '',
		imageLink: '',
		published: false,
	});
	const [open, setOpen] = useState(false);

	const handleFormSubmit = (e) => {
		const token = localStorage.getItem('token');

		e.preventDefault();
		const newCourse = {
			title: formData.title,
			description: formData.description,
			price: Number(formData.price),
			imageLink: formData.imageLink,
			published: Boolean(formData.published),
		};

		axios
			.post('http://localhost:3000/admin/courses', newCourse, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setOpen(true);
			});
		resetFormData();
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Paper
				sx={{
					marginTop: 8,
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
					Create Course Page
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
						label="Title"
						type="text"
						name="title"
						value={formData.title}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: '20px' }}
						fullWidth={true}
						label="Description"
						type="text"
						name="description"
						value={formData.description}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: '20px' }}
						fullWidth={true}
						label="Price"
						type="text"
						name="price"
						value={formData.price}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: '20px' }}
						fullWidth={true}
						label="Image Link"
						type="text"
						name="imageLink"
						value={formData.imageLink}
						onChange={(e) => handleFormChange(e)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								name="published"
								value={formData.published}
								onChange={(e) => handleFormChange(e)}
							/>
						}
						label="Published"
					/>
				</Box>
				<div>
					<Button
						size="large"
						variant="contained"
						onClick={(e) => handleFormSubmit(e)}
					>
						Create Course
					</Button>
				</div>
			</Paper>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success" sx={{ width: '100%' }}>
					Course created successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}
export default CreateCourse;
