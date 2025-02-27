import express from "express";
import { config } from "dotenv";

import imageRoute from "./routes/imageRoutes.js";

import authRoute from "./routes/authRoutes.js";
import cors from "cors";

config({ path: "./config/config.env" });

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
// Routes

app.use("/api/users",authRoute);
app.use("/api", imageRoute)
