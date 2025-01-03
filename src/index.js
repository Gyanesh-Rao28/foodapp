import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import userRouter from './routes/user.route.js';
import menuRouter from './routes/menu.route.js';
import orderRouter from './routes/order.route.js';

const PORT=5000


dotenv.config({});

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://foodapp-frontend-seven.vercel.app/",
  "http://localhost:5000",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



app.get("/", (req, res)=>{
    res.send("working")
})


app.use('/api/auth', userRouter)
app.use('/api/menu', menuRouter)
app.use('/api/food', orderRouter)

app.listen(process.env.PORT || PORT,()=>{
    connectDB()
    console.log(`PORT: ${PORT}`)
})  