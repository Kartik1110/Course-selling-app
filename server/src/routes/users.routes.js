const express = require('express');
const router = express.Router();
const Courses = require('../models/courses.model');
const User = require('../models/user.model');
const { authenticateJwt } = require('../middleware/auth');
const { generateJwt } = require('../utils/utils');

// User routes
/* USER - signup route */
router.post('/signup', async (req, res) => {
	let { username, password } = req.body;
	let userFound = await User.findOne({ username });

	if (userFound) {
		return res.status(403).json({ message: 'User already exists' });
	} else {
		const newUserObj = {
			username,
			password,
		};
		const newUser = new User(newUserObj);
		await newUser.save();
		const token = generateJwt({ ...newUserObj, role: 'User' });
		res.status(200).send({ message: 'User created successfully', token });
	}
});

/* USER - login route */
router.post('/login', async (req, res) => {
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
router.get('/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({ published: true });
	res.json({ courses });
});

/* USER - purchase a course */
router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
	const course = await Courses.findById(req.params.courseId);
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
router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
	const user = await User.findOne({ username: req.user.username }).populate(
		'purchasedCourses'
	);
	if (user) {
		res.json({ purchasedCourses: user.purchasedCourses || [] });
	} else {
		res.status(403).json({ message: 'User not found' });
	}
});

module.exports = router;
