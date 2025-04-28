import express from "express";
import dotenv from "dotenv";
import "./db.js";
import roomRoute from "./routes/roomRoute.js";
import cors from "cors";
import morgan from "morgan";
import usersRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/get/room", roomRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runing on Port ${port}`);
});
