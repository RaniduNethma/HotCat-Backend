import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());

//Routes
app.use('/api/users', userRouter);

export default app;