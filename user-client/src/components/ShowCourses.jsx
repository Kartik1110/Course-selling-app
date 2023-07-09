import { useState, useEffect } from 'react';
import { Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Course from './Course';

function ShowCourses() {
	const [courses, setCourses] = useState([]);
	const [open, setOpen] = useState(false);

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
				setOpen(true);
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
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="success" sx={{ width: '100%' }}>
					Course purchased!
				</Alert>
			</Snackbar>
		</div>
	);
}

export default ShowCourses;
