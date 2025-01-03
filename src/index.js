import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import userRouter from "./routes/user.route.js";
import menuRouter from "./routes/menu.route.js";
import orderRouter from "./routes/order.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/auth", userRouter);
app.use("/api/menu", menuRouter);
app.use("/api/food", orderRouter);

// Connect to DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
      console.log(`API endpoints ready at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// For serverless environments
export default app;
