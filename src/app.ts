import express from "express";
import authRouter from "./routes/auth.route.js";
import staffAuthRouter from "./routes/staff.auth.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/users', authRouter);
app.use('/api/users/staff', staffAuthRouter);

export default app;