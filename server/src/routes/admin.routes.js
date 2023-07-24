const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model');
const Courses = require('../models/courses.model');
const { authenticateJwt } = require('../middleware/auth');
const { generateJwt } = require('../utils/utils');

// Admin routes
/* ADMIN - signup route */
router.post('/signup', async (req, res) => {
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
router.post('/login', async (req, res) => {
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
router.post('/courses', authenticateJwt, async (req, res) => {
	const course = new Courses(req.body);
	await course.save();
	res.json({ message: 'Course created successfully', courseId: course.id });
});

/* ADMIN - update a course */
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
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
router.get('/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({});
	res.json({ courses });
});

/* ADMIN - get a single course by id */
router.get('/courses/:courseId', authenticateJwt, async (req, res) => {
	const course = await Courses.findById(req.params.courseId);
	if (course) {
		res.json({ course });
	} else {
		res.status(404).send({ message: 'Course not found' });
	}
});

module.exports = router;
