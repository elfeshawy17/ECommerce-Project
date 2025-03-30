import { Router } from "express";
import userController from "./user.controller.js";
import { checkEmail } from './../../middlewares/checkEmails.js';
import { validate } from "../../middlewares/validate.js";
import { addValidation } from "./user.validate.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import authController from "../auth/auth.controller.js";


export const userRouter = Router();

userRouter.use(authController.protectedRoute, allowedTo('admin'));

userRouter.post('/', validate(addValidation), checkEmail, userController.addUser);

userRouter.get('/', userController.getAllUsers);

userRouter.put('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);