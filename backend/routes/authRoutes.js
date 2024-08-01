import express from "express";

import {
  signUpController,
  signInController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-up", signUpController);

router.post("/sign-in", signInController);

export default router;
