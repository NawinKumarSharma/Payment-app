import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";

dotenv.config({
    path: "./.env",
  });
  
const app = express();
app.use(express.json({ limit: "18kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));
app.use("/api/v1", mainRouter);


export { app };
