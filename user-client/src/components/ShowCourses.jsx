import { useState, useEffect } from 'react';
import { Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Course from './Course';

function ShowCourses() {
	const [courses, setCourses] = useState([]);
	/* This is used to set data for SnackBar component  */
	const [snackBar, setSnackBar] = useState({
		open: false,
		severity: 'success',
		msg: '',
	});

	useEffect(() => {
		fetchCourse();
	}, []);

	/* This function is used to fetch all the courses */
	const fetchCourse = () => {
		const token = localStorage.getItem('token');

		axios
			.get('http://localhost:3000/users/courses', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setCourses(res.data.courses);
			});
	};

	const buyCourse = (id) => {
		const token = localStorage.getItem('token');
		axios
			.post(
				`http://localhost:3000/users/courses/${id}`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setSnackBar({
					open: true,
					msg: res.data.message,
					severity: 'success',
				});
			})
			.catch((error) => {
				setSnackBar({
					open: true,
					msg: error.response.data.message,
					severity: 'error',
				});
			});
	};
	return (
		<div>
			<Typography
				sx={{ marginTop: 5 }}
				align={'center'}
				component="h1"
				variant="h4"
				fontWeight={600}
			>
				Courses
			</Typography>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}
			>
				{courses.map((course) => {
					const courseObj = {
						title: course.title,
						description: course.description,
						price: course.price,
						imageLink: course.imageLink,
					};
					return (
						<Course
							key={course._id}
							courses={courseObj}
							btnText="Buy course"
							onBuyClick={() => buyCourse(course._id)}
						/>
					);
				})}
			</div>
			<Snackbar
				open={snackBar.open}
				autoHideDuration={6000}
				onClose={() => setSnackBar({ open: false })}
			>
				<Alert severity={snackBar.severity} sx={{ width: '100%' }}>
					{snackBar.msg}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default ShowCourses;
