import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
const upload = multer({ storage });

// POST /api/upload/image  →  returns { url }
router.post("/image", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ url: req.file.path });
});

export default router;
