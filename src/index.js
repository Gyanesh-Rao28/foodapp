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
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))



app.get("/", (req, res)=>{
    res.send("working")
})


app.use('/auth', userRouter)
app.use('/menu', menuRouter)
app.use('/food', orderRouter)

app.listen(process.env.PORT || PORT,()=>{
    connectDB()
    console.log(`PORT: ${PORT}`)
})  