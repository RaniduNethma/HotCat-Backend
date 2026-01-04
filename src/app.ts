import express from "express";
import authRouter from "./routes/auth.route.js";
import tableRouter from "./routes/table.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import priceListRouter from "./routes/priceList.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/users", authRouter);
app.use("/api/tables", tableRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/pricelist", priceListRouter);

export default app;
