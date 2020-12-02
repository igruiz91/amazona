import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(morgan("dev"));



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (_, res) => {
  res.send("Server ready!");
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT||5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
