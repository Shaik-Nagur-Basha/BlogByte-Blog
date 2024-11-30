import express from "express";
import {
  signup,
  signin,
  google,
  adminControl,
} from "../controllers/authController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.put("/:userId/:newStatus", verifyToken, adminControl);

export default router;
