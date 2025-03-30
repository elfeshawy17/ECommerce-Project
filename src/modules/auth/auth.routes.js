import { Router } from "express";
import authController from './auth.controller.js';
import { checkEmail } from "../../middlewares/checkEmails.js";

export const authRouter = Router();

authRouter.post('/register', checkEmail, authController.register);

authRouter.post('/login', authController.login);

authRouter.post('/changePassword', authController.changePassword);
