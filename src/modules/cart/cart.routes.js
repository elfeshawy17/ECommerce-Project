import { Router } from "express";
import authController from "../auth/auth.controller.js";
import cartController from "./cart.controller.js";
import { validate } from "../../middlewares/validate.js";
import { cartSchema } from './cart.validate.js';

export const cartRouter = Router();

cartRouter.use(authController.protectedRoute);

cartRouter.route('/')
            .post(validate(cartSchema), cartController.addCart)
            .patch(cartController.updateQuantity)
            .delete(cartController.deleteProductFromCart)

cartRouter.post('/applyCoupon', cartController.applyCoupon);