import jsonwebtoken from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("No token provided");
  try {
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
