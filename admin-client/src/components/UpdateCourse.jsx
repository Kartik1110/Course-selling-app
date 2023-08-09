import { useState, useEffect } from "react";
import {
	Button,
	Paper,
	Typography,
	FormControlLabel,
	TextField,
	Box,
	Checkbox,
	Snackbar,
	Alert
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Course from "../components/Course";

export default function UpdateCourse() {
	const { courseId } = useParams();
	const [courseObj, setCourseObj] = useState({});
	/* This is used to set data for SnackBar component  */
	const [snackBar, setSnackBar] = useState({
		open: false,
		severity: "success",
		msg: ""
	});
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		imageLink: "",
		published: false
	});

	/* This function is used to handle form change */
	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		const fetchCourse = () => {
			const token = localStorage.getItem("token");

			axios
				.get(`http://localhost:3000/admin/courses/${courseId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					setCourseObj(res.data.course);
					const { title, description, price, imageLink, published } =
						res.data.course;
					setFormData({
						title,
						description,
						price: String(price),
						imageLink,
						published
					});
				});
		};
		fetchCourse();
	}, [courseId]);

	/* This function is used to handle course update  */
	const handleCourseUpdate = () => {
		const token = localStorage.getItem("token");

		const updatedCourse = {
			title: formData.title,
			description: formData.description,
			price: Number(formData.price),
			imageLink: formData.imageLink,
			published: Boolean(formData.published)
		};

		axios
			.put(`http://localhost:3000/admin/courses/${courseId}`, updatedCourse, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				setSnackBar({
					open: true,
					msg: res.data.message,
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
		setFormData({
			title: "",
			description: "",
			price: "",
			imageLink: "",
			published: false
		});
	};

	return (
		<div
			style={{
				height: "90vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Course courses={courseObj} />;
			<Paper
				sx={{
					marginTop: 8,
					marginBottom: 8,
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
					Update Course
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
						label="Title"
						type="text"
						name="title"
						value={formData.title}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: "20px" }}
						fullWidth={true}
						label="Description"
						type="text"
						name="description"
						value={formData.description}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: "20px" }}
						fullWidth={true}
						label="Price"
						type="text"
						name="price"
						value={formData.price}
						onChange={(e) => handleFormChange(e)}
					/>
					<TextField
						sx={{ margin: "20px" }}
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
