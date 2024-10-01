import express from "express";
import { create, getposts } from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);

export default router;
