import ShowCourses from '../components/ShowCourses';
import MainPage from '../components/MainPage';
import CreateCourse from '../components/CreateCourse';

export const protectedRoutesList = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{ path: '/courses', element: <ShowCourses /> },
			{ path: '/create-course', element: <CreateCourse /> },
		],
	},
];
