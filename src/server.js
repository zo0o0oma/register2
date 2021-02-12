import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/registerRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());

//database conection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db not connected'));
db.once('open', function () {
  console.log('db connected');
});

app.use('/uploads', express.static('uploads'));
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  console.log('server work');
});
