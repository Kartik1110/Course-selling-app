const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin.routes');
const usersRouter = require('./routes/users.routes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

/* Connecting to mongoDB */
const mongoDBURI = 'mongodb+srv://mongo:mongo@cluster0.t8eg4us.mongodb.net/';
mongoose.connect(mongoDBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'courses',
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
