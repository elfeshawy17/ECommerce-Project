import { Router } from "express";
import couponController from "./coupon.controller.js";
import authController from "../auth/auth.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";


export const couponRouter = Router();

couponRouter.use(authController.protectedRoute, allowedTo('admin', 'manager'));

couponRouter.route('/')
            .post(couponController.addCoupon)
            .get(couponController.getAllCoupons)

couponRouter.route('/:id')
            .put(couponController.updateCoupon)
            .delete(couponController.deleteCoupon)