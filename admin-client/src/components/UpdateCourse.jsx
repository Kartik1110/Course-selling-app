import { useState, useEffect } from 'react';
import {
	Button,
	Paper,
	Typography,
	FormControlLabel,
	TextField,
	Box,
	Checkbox,
	Snackbar,
	Alert,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Course from '../components/Course';
import { useForm } from '../hooks/useForm';

export default function UpdateCourse() {
	const { courseId } = useParams();
	const [courseObj, setCourseObj] = useState({});
	const [open, setOpen] = useState(false);
	const [formData, handleFormChange, resetFormData] = useForm({
		title: '',
		description: '',
		price: '',
		imageLink: '',
		published: false,
	});

	useEffect(() => {
		const fetchCourse = () => {
			const token = localStorage.getItem('token');

			axios
				.get(`http://localhost:3000/admin/courses/${courseId}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setCourseObj(res.data.course);
				});
		};
		fetchCourse();
	}, [courseId]);

	const handleCourseUpdate = () => {
		const token = localStorage.getItem('token');

		const updatedCourse = {
			title: formData.title,
			description: formData.description,
			price: Number(formData.price),
			imageLink: formData.imageLink,
			published: Boolean(formData.published),
		};

		axios
			.put(`http://localhost:3000/admin/courses/${courseId}`, updatedCourse, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setOpen(true);
			});
		resetFormData();
	};

	return (
		<div
			style={{
				height: '90vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Course courses={courseObj} />;
			<Paper
				sx={{
					marginTop: 8,
					marginBottom: 8,
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
					Update Course
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
						onClick={() => handleCourseUpdate()}
					>
						Update Course
					</Button>
				</div>
			</Paper>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success" sx={{ width: '100%' }}>
					Course updated successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}
