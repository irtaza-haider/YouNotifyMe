import express, { json, urlencoded } from "express";
import cors from "cors";
import verifyRouter from "./routes/verify.js";

const app = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

//Import Route
app.use("/verify", verifyRouter);

export default app;
