import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

const signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser;

    if (username) {
      existingUser = await UserModel.findOne({ username });
    } else if (email) {
      existingUser = await UserModel.findOne({ email });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await UserModel.create({ username, email, password });

    user.password = undefined;
    res.status(201).json({
      message: "New user created",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    if (!email || !password) {
      res.status(404).json({ message: "Please provide email and password" });
      return;
    }

    user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    bcrypt.compare(password, user.password, (bcryptError, isPasswordValid) => {
      if (bcryptError) {
        res.status(500).json({
          message: "An error occurred when we tried to log you in",
          error: bcryptError.message,
        });
      }

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password!" });
      }
    });

    delete user.password;
    return res
      .status(200)
      .json({ message: "User authenticated successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signUpController, signInController };
