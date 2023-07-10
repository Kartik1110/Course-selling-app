import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Course from '../components/Course';

export default function UpdateCourse() {
	const { courseId } = useParams();
	const [courseObj, setCourseObj] = useState({});

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
		</div>
	);
}
