import User from "../models/userModel.js";
import bcryptjs from "bcrypt";

export const signup = async (req, res) => {
  let { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.send("Sign-up Successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
