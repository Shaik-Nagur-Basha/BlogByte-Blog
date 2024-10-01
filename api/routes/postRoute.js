import express from "express";
import { create, destroy, getposts, update } from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/destroy/:postId/:ownerId", verifyToken, destroy);
router.put("/update/:postId/:ownerId", verifyToken, update);

export default router;
