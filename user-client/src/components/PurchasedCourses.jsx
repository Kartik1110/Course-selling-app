import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import Course from './Course';

export default function PurchasedCourses() {
	const [courses, setCourses] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchCourse();
	}, []);

	/* This function is used to fetch all the courses */
	const fetchCourse = () => {
		const token = localStorage.getItem('token');

		axios
			.get('http://localhost:3000/users/purchasedCourses', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setCourses(res.data.purchasedCourses);
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
				My Courses
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
							btnText="Show content"
						/>
					);
				})}
			</div>
		</div>
	);
}
