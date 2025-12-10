import express from "express";
import authRouter from "./routes/auth.route.js";
import tableRouter from "./routes/table.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/users", authRouter);
app.use("/api/tables", tableRouter);

export default app;
