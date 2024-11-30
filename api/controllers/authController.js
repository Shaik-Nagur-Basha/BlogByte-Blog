import User from "../models/userModel.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  let { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Sign-up Successful");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found")); //We can use same error message for INCORRECT email For "High security"
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password")); //We can use same error message for INCORRECT email For "High security"
    }

    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  let { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      function rand(name) {
        return (
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4)
        );
      }
      const newUser = new User({
        username: rand(name),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const adminControl = async (req, res, next) => {
  if (!req.params.userId || !req.params.newStatus || !req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to perform this action")
    );
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin: req.params.newStatus },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(errorHandler(404, "User not found")); //We can use same error message for INCORRECT email For "High security"  or "User not found" For "Normal security"
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
