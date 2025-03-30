import { Router } from "express";
import authController from "../auth/auth.controller.js";
import wishListController from "./wishList.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import { validate } from './../../middlewares/validate.js';
import { wishListSchema } from './wishList.validate.js';


export const wishListRouter = Router();

wishListRouter.use(authController.protectedRoute, validate(wishListSchema), allowedTo('user', 'admin'));

wishListRouter.patch('/', wishListController.addWishList);

wishListRouter.delete('/', wishListController.removeFromWishList);
