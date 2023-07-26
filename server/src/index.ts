import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.routes';
import usersRouter from './routes/users.routes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

/* Connecting to MongoDB */
const mongoDBURI =
  'mongodb+srv://mongo:mongo@cluster0.t8eg4us.mongodb.net/';
mongoose.connect(mongoDBURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName: 'courses',
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
