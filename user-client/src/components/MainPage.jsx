import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainPage = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default MainPage;
