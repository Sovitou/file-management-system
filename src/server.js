import express, { json } from "express";
import { configDotenv } from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";
import { fileRoutes } from "./routes/fileRoutes.js";
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use("/api/v1/auth", authRoutes);
app.use("api/v1/file", fileRoutes);

app.get("/", (req, res) => {
  res.send("Hello there 👋");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
