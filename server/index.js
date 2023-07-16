const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Admin = require('./models/admin.model');
const User = require('./models/user.model');
const Courses = require('./models/courses.model');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const SECRET_KEY = 's3cr3tk3333y';

/* This function is used to generate a jwt token */
function generateJwt(user) {
	const payload = { username: user.username, role: user.role };

	return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

/* This middleware is used to verify the jwt token */
function authenticateJwt(req, res, next) {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, SECRET_KEY, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
}
/* Connecting to mongoDB */
const mongoDBURI = 'mongodb+srv://mongo:mongo@cluster0.t8eg4us.mongodb.net/';
mongoose.connect(mongoDBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'courses',
});

// Admin routes
/* ADMIN - signup route */
app.post('/admin/signup', async (req, res) => {
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
app.post('/admin/login', async (req, res) => {
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
app.post('/admin/courses', authenticateJwt, async (req, res) => {
	const course = new Courses(req.body);
	await course.save();
	res.json({ message: 'Course created successfully', courseId: course.id });
});

/* ADMIN - update a course */
app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
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
app.get('/admin/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({});
	res.json({ courses });
});

/* ADMIN - get a single course by id */
app.get('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
	const course = await Courses.findById(req.params.courseId);
	if (course) {
		res.json({ course });
	} else {
		res.status(404).send({ message: 'Course not found' });
	}
});

// User routes
/* USER - signup route */
app.post('/users/signup', async (req, res) => {
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
app.post('/users/login', async (req, res) => {
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
app.get('/users/courses', authenticateJwt, async (req, res) => {
	const courses = await Courses.find({ published: true });
	res.json({ courses });
});

/* USER - purchase a course */
app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
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
app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
	const user = await User.findOne({ username: req.user.username }).populate(
		'purchasedCourses'
	);
	if (user) {
		res.json({ purchasedCourses: user.purchasedCourses || [] });
	} else {
		res.status(403).json({ message: 'User not found' });
	}
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
