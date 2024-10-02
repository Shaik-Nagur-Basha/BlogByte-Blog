import Comment from "../models/commentModel.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, ownerId } = req.body;
    if (ownerId !== req.user.id) {
      next(errorHandler(403, "You are not allowed to create this post"));
    }
    const newComment = new Comment({ content, postId, ownerId });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
