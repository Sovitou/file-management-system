import { Router } from "express";
import * as fileController from "../controllers/fileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const fileRoutes = Router();

// Get Request
fileRoutes.get("/", authMiddleware, fileController.listFiles);
fileRoutes.get("/search", authMiddleware, fileController.searchFiles);
fileRoutes.get("/download/:id", authMiddleware, fileController.downloadFile);
fileRoutes.get("/view/:id", authMiddleware, fileController.viewFile);

// POST Request
fileRoutes.post("/upload", authMiddleware, fileController.uploadFile);

// Delete Request
fileRoutes.delete("/:id", authMiddleware, fileController.deleteFile);
