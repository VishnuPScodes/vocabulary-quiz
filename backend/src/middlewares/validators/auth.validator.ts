const { body, validationResult } = require("express-validator");
import { validateRegisterBody } from ".";

export const registerValidation = [
  body("username").isString().isLength({ min: 3, max: 20 }),
  body("password").isString().isLength({ min: 6, max: 20 }),
  body("email").isEmail(),
  validateRegisterBody,
];

export const loginValidation = [
  body("password").isString().isLength({ min: 6, max: 20 }),
  body("email").isString().isEmail(),
  validateRegisterBody,
];
