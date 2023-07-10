import Login from '../components/Login';
import Register from '../components/Register';
import MainPage from '../components/MainPage';

export const privateRoutesList = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{ path: '/register', element: <Register /> },
		],
	},
];
