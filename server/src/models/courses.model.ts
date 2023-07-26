import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	imageLink: String,
	published: Boolean,
});

const Courses = mongoose.model('Course', courseSchema);

export default Courses;
