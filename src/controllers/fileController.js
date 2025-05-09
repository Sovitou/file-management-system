import multer from "multer";

import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
}); // 10MB limit

export const uploadFile = [
  upload.single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded");
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
        path: req.file.path,
        userId: req.user.userId,
      },
    });
    res.status(201).json(file);
  },
];

export const listFiles = async (req, res) => {
  const files = await prisma.file.findMany({
    where: { userId: req.user.userId },
  });
  res.json(files);
};

export const downloadFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (file && file.userId === req.user.userId) {
    res.download(file.path, file.name);
  } else {
    res.status(404).send("File not found or unauthorized");
  }
};

export const deleteFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (file && file.userId === req.user.userId) {
    fs.unlinkSync(file.path);
    await prisma.file.delete({ where: { id: file.id } });
    res.send("File deleted");
  } else {
    res.status(403).send("Forbidden");
  }
};

export const viewFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (
    file &&
    file.userId === req.user.userId &&
    file.type.startsWith("image/")
  ) {
    res.sendFile(file.path, { root: "." });
  } else {
    res.status(403).send("Cannot view this file or unauthorized");
  }
};

export const searchFiles = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).send("Search query is required");
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.userId,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { type: { contains: query, mode: "insensitive" } },
      ],
    },
  });
  res.json(files);
};
