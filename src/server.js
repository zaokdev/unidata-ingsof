import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import pkg from "colors";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import studentsRouter from "./routes/students.routes.js";
import academicRouter from "./routes/academic.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/auth", authRouter);
app.use("/students", studentsRouter);
app.use("/academic", academicRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Unidata`.blue);
  console.log(`Corriendo en el puerto ${PORT}`);
});
