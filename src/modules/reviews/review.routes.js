import { Router } from "express";
import authController from '../auth/auth.controller.js';
import reviewController from "./review.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";

export const reviewRouter = Router();

reviewRouter.use(authController.protectedRoute, allowedTo('user', 'admin'));

reviewRouter.post('/', reviewController.addReview);

reviewRouter.get('/', reviewController.getAllReviews);

reviewRouter.put('/:id', reviewController.updateReview);

reviewRouter.delete('/:id', reviewController.deleteReview);
