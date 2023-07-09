import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getAllUpdatedRoutes } from '../custom';

export const CustomRoutes = () => {
	const x = getAllUpdatedRoutes();
	console.log(x);

	const router = createBrowserRouter(getAllUpdatedRoutes());
	return <RouterProvider router={router} />;
};
