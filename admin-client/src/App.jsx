import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default App;
