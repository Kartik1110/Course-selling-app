import ShowCourses from '../components/ShowCourses';
import PurchasedCourses from '../components/PurchasedCourses';
import MainPage from '../components/MainPage';

export const protectedRoutesList = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{ path: '/courses', element: <ShowCourses /> },
			{ path: '/my-courses', element: <PurchasedCourses /> },
		],
	},
];
