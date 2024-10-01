import express from "express";
import { create, destroy, getposts } from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/destroy/:postId/:ownerId", verifyToken, destroy);

export default router;
