
import { Router } from 'express';
import {z} from 'zod';
import Courses from '../models/courses.model';
import User from '../models/user.model';
import { authenticateJwt } from '../middleware/auth';
import { generateJwt } from '../utils/utils';

const usersRouter = Router();


const userProps = z.object({
	username: z.string().min(6).max(20),
	password: z.string().min(6).max(20),
  });

// User routes
/* USER - signup route */
usersRouter.post('/signup', async (req, res) => {	
	let { username, password } = req.body;
	const parsedData = userProps.safeParse({ username, password });
	
	/* Validating the input in req body */ 
	if(!parsedData.success) {
		return res.status(400).json({ message: 'Username and password must be strings' });
	}

	let userFound = await User.findOne({ username: parsedData.data.username });

	if (userFound) {
		return res.status(403).json({ message: 'User already exists' });
	} else {
		const newUserObj = {
			username: parsedData.data.username,
			password: parsedData.data.password,
		};
		const newUser = new User(newUserObj);
		await newUser.save();
		const token = generateJwt({ ...newUserObj, role: 'User' });
		res.status(200).send({ message: 'User created successfully', token });
	}
});

/* USER - login route */
usersRouter.post('/login', async (req, res) => {
	const { username, password } = req.headers;
	const user = await User.findOne({ username, password });
	if (user) {
		const token = generateJwt(user);
		const loggedInUser = {
			name: user.username,
			token,
		};
		res.status(200).json({ message: 'Logged in successfully', loggedInUser });
	} else {
		res.status(403).json({ message: 'Invalid username or password' });
	}
});

/* USER - get all the courses */
usersRouter.get('/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({ published: true });
	res.json({ courses });
});

/* USER - purchase a course */
/* TODO: Remove all any */ 
usersRouter.post('/courses/:courseId', authenticateJwt, async (req: any, res) => {
	const course: any = await Courses.findById(req.params.courseId);
	if (course) {
		const user = await User.findOne({ username: req.user.username });
		if (user) {
			user.purchasedCourses.push(course);
			await user.save();
			res.json({ message: 'Course purchased successfully' });
		} else {
			res.status(403).json({ message: 'User not found' });
		}
	} else {
		res.status(404).json({ message: 'Course not found' });
	}
});

/* USER - get purchased courses */
/* TODO: Remove any */ 
usersRouter.get('/purchasedCourses', authenticateJwt, async (req: any, res) => {
	const user = await User.findOne({ username: req.user.username }).populate(
		'purchasedCourses'
	);
	if (user) {
		res.json({ purchasedCourses: user.purchasedCourses || [] });
	} else {
		res.status(403).json({ message: 'User not found' });
	}
});

export default usersRouter;
