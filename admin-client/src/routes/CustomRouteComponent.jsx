import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getAllUpdatedRoutes } from '../custom';

export const CustomRoutes = () => {
	const router = createBrowserRouter(getAllUpdatedRoutes());
	return <RouterProvider router={router} />;
};
