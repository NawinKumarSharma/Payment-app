import express from "express";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("hi from server");
});
export { app };
