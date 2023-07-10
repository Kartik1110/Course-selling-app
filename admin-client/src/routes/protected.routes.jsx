import ShowCourses from '../components/ShowCourses';
import MainPage from '../components/MainPage';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse';

export const protectedRoutesList = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{ path: '/courses', element: <ShowCourses /> },
			{ path: '/create-course', element: <CreateCourse /> },
			{ path: '/course/:courseId', element: <UpdateCourse /> },
		],
	},
];
