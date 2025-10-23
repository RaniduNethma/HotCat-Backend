import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/users', authRouter);
app.use('/api/users', userRouter);

export default app;