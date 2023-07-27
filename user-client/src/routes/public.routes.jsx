import Landing from '../components/Landing';
import MainPage from '../components/MainPage';

export const publicRoutesList = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{
				path: '/',
				element: <Landing />,
				exact: true,
			},
		],
	},
];
