import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

configDotenv();
export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).send("Email already exists");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jsonwebtoken.sign(
      { userId: user.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};
