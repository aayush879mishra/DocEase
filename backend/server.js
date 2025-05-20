import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; 
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
connectCloudinary(); // Connect to Cloudinary

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ENDPOINTS
app.use('/api/admin', adminRouter); 
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter); 

app.get('/', (req, res) => {
  res.send('Hello World!jhbjhjh jygyv');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});