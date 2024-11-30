import Post from "../models/postModel.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    ownerId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const shortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { ownerId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: shortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = req.query.userId
      ? await Post.countDocuments({ ownerId: req.query.userId })
      : await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = req.query.userId
      ? await Post.countDocuments({
          createdAt: { $gte: oneMonthAgo },
          ownerId: req.query.userId,
        })
      : await Post.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  if (
    !req.user ||
    !req.params.userId ||
    !req.params.postId ||
    req.user.id !== req.params.userId ||
    !req.user.isAdmin
  ) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    const post = await Post.findById(req.params.postId);
    post
      ? req.params.userId === post.ownerId || req.user.isAdmin
        ? await Post.findByIdAndDelete(req.params.postId)
        : next(errorHandler(403, "You are not allowed to delete this post"))
      : next(errorHandler(400, "Post not found"));

    res.status(200).json("This post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  if (!req.user || req.user.id !== req.params.ownerId || !req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          content: req.body.content,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
