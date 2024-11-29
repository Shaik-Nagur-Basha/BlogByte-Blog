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

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    if (comment.ownerId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(editComment);
  } catch (error) {}
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    if (comment.ownerId !== req.user.id || !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(430, "You are not allowed to get the comments"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const shortDirection = req.query.sort === "asc" ? 1 : -1;
    // const userComments = await Comment.find({ ownerId: req.query.userId });

    const comments = await Comment.find({
      ...(req.user.isAdmin ? {} : { ownerId: req.query.userId }),
    })
      .sort({ createdAt: shortDirection })
      .skip(startIndex)
      .limit(limit);

    const requiredData = await Comment.find({}, "createdAt numberOfLikes");
    const userComments = req.query.userId
      ? requiredData.filter((comment) => comment._id === req.query.userId)
      : requiredData;

    const totalComments = userComments.length;

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    let lastMonthComments = 0;
    let totalNoOfLikes = 0;
    let lastMonthLikes = 0;
    userComments.map((userComment) => {
      userComment.createdAt >= oneMonthAgo &&
        lastMonthComments++ &&
        (lastMonthLikes += userComment.numberOfLikes);
      totalNoOfLikes += userComment.numberOfLikes;
    });

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
      totalNoOfLikes,
      lastMonthLikes,
    });
  } catch (error) {
    next(error);
  }
};
