import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Landing from '../components/Landing';
import CreateCourse from '../components/CreateCourse';
import Register from '../components/Register';
import ShowCourses from '../components/ShowCourses';
import Error from '../components/Error';
import App from '../App';

export const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{ path: '/register', element: <Register /> },
			{ path: '/courses', element: <ShowCourses /> },
			{ path: '/create-course', element: <CreateCourse /> },
		],
		errorElement: <Error />,
	},
]);
