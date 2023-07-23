import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Course from './Course';

function ShowCourses() {
	// const [courses, setCourses] = useState([]);
	const courseQuery = useQuery({
		queryKey: ['courses'],
		queryFn: fetchCourse,
	});

	useEffect(() => {
		courseQuery.refetch();
		// fetchCourse();
	}, [courseQuery]);

	if (courseQuery.error) {
		return <h1>Error: {JSON.stringify(courseQuery.error.message)}</h1>;
	}

	if (courseQuery.isLoading) {
		return <h1>Loading...</h1>;
	}

	function fetchCourse() {
		const token = localStorage.getItem('token');

		return axios
			.get('http://localhost:3000/admin/courses', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log('res>>', courseQuery.data);
				return res.data.courses;
				// setCourses(res.data.courses);
			});
	}
	return (
		<div>
			<Typography
				align={'center'}
				component="h1"
				variant="h4"
				fontWeight={600}
				sx={{ marginTop: 5, color: 'white' }}
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
				{courseQuery.data.map((course) => {
					const courseObj = {
						id: course._id,
						title: course.title,
						description: course.description,
						price: course.price,
						imageLink: course.imageLink,
						published: course.published,
					};
					return (
						<Course key={course._id} courses={courseObj} editable={true} />
					);
				})}
			</div>
		</div>
	);
}

export default ShowCourses;
