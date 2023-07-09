import { redirect } from 'react-router-dom';
import Error from '../components/Error';
import {
	protectedRoutesList,
	privateRoutesList,
	publicRoutesList,
} from '../routes';

// const routesList = {
// 	private: privateRoutesList,
// 	public: publicRoutesList,
// 	protected: protectedRoutesList,
// };

/* get all PROTECTED routes */
function getProtectedRoutes(protectedRoutes) {
	if (protectedRoutes && protectedRoutes.length > 0) {
		return protectedRoutes.map((item) => ({
			...item,
			errorElement: <Error />,
			loader: () => {
				const token = localStorage.getItem('token');
				if (!token) return redirect('/login');
				return null;
			},
		}));
	}
	return [];
}

/* get all PUBLIC routes */
function getPublicRoutes(publicRoutes) {
	if (publicRoutes && publicRoutes.length > 0) {
		console.log(publicRoutes);
		return publicRoutes.map((item) => ({
			errorElement: <Error />,
			...item,
		}));
	}
	return [];
}

/* get all PRIVATE routes */
function getPrivateRoutes(privateRoutes) {
	if (privateRoutes && privateRoutes.length > 0) {
		return privateRoutes.map((item) => ({
			errorElement: <Error />,
			...item,
		}));
	}
	return [];
}

/* This function maps all routes to the routesList object and returns all routes */
export const getAllUpdatedRoutes = () => {
	let updatedRoutesList = [];
	if (publicRoutesList) {
		updatedRoutesList = [
			...updatedRoutesList,
			...getPublicRoutes(publicRoutesList),
		];
	}
	if (privateRoutesList) {
		updatedRoutesList = [
			...updatedRoutesList,
			...getPrivateRoutes(privateRoutesList),
		];
	}
	if (protectedRoutesList) {
		updatedRoutesList = [
			...updatedRoutesList,
			...getProtectedRoutes(protectedRoutesList),
		];
	}
	return updatedRoutesList;
};
