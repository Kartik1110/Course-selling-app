import express, { Request, Response, Router } from 'express';
import Admin from '../models/admin.model';
import Courses from '../models/courses.model';
import { authenticateJwt } from '../middleware/auth';
import { generateJwt } from '../utils/utils';

const adminRouter = Router();
// Admin routes
/* ADMIN - signup route */
adminRouter.post('/signup', async (req: Request, res: Response) => {
	let { username, password } = req.body;
	let adminFound = await Admin.findOne({ username });

	if (adminFound) {
		return res.status(403).json({ message: 'Admin already exists' });
	} else {
		const newAdminObj = {
			username,
			password,
		};
		const newAdmin = new Admin(newAdminObj);
		await newAdmin.save();
		const token = generateJwt({ ...newAdminObj, role: 'Admin' });
		res.status(200).send({ message: 'Admin created successfully', token });
	}
});

/* ADMIN - login route */
adminRouter.post('/login', async (req, res) => {
	const { username, password } = req.headers;
	const admin = await Admin.findOne({ username, password });
	if (admin) {
		const token = generateJwt(admin);
		const loggedInAdmin = {
			name: admin.username,
			token,
		};
		res.status(200).json({ message: 'Logged in successfully', loggedInAdmin });
	} else {
		res.status(403).json({ message: 'Invalid username or password' });
	}
});

/* ADMIN - create a course  */
adminRouter.post('/courses', authenticateJwt, async (req, res) => {
	const course = new Courses(req.body);
	await course.save();
	res.json({ message: 'Course created successfully', courseId: course.id });
});

/* ADMIN - update a course */
adminRouter.put('/courses/:courseId', authenticateJwt, async (req, res) => {
	const course = await Courses.findByIdAndUpdate(
		req.params.courseId,
		req.body,
		{
			new: true,
		}
	);
	if (course) {
		res.status(200).send({ message: 'Course updated successfully' });
	} else {
		res.status(404).send({ message: 'Course not found' });
	}
});

/* ADMIN - get all the courses */
adminRouter.get('/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({});
	res.json({ courses });
});

/* ADMIN - get a single course by id */
adminRouter.get('/courses/:courseId', authenticateJwt, async (req, res) => {
	const course = await Courses.findById(req.params.courseId);
	if (course) {
		res.json({ course });
	} else {
		res.status(404).send({ message: 'Course not found' });
	}
});

export default adminRouter;
