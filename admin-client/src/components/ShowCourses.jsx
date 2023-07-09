import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import Course from './Course';

function ShowCourses() {
	// Add code to fetch courses from the server
	// and set it in the courses state variable.
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		fetchCourse();
	}, []);

	const fetchCourse = () => {
		const token = localStorage.getItem('token');

		axios
			.get('http://localhost:3000/admin/courses', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setCourses(res.data.courses);
			});
	};
	return (
		<div>
			<Typography align={'center'} component="h1" variant="h4" fontWeight={600} 
			sx={{ marginTop: 5, color:'white' }}>
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
						published: course.published,
					};
					return <Course key={course._id} courses={courseObj} />;
				})}
			</div>
		</div>
	);
}

export default ShowCourses;
