import express from "express";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validators/auth.validator";
import { AuthController } from "../controller/auth.controller";
const router = express.Router();
const authController = new AuthController();

router.post("/register", registerValidation, (req, res) =>
  authController.register(req, res)
);
router.post("/login", loginValidation, (req, res) =>
  authController.login(req, res)
);

router.post("/logout", (req, res) => authController.logout(req, res));
export default router;
