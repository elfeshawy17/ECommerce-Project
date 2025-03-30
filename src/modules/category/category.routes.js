import { Router } from "express";
import categoryController from "./category.controller.js";
import { uploadSingleFile } from "../../../uploads/fileUpload.js";
import { validate } from "../../middlewares/validate.js";
import { addValidation } from "./category.validation.js";
import { subCategoryRouter } from "../subCategory/subCategory.routes.js";
import { allowedTo } from './../../middlewares/allowedTo.js';
import authController from "../auth/auth.controller.js";

export const categoryRouter = Router();

categoryRouter.use('/:categoryId/subCategory', subCategoryRouter)

categoryRouter.use(authController.protectedRoute, allowedTo('admin', 'manager'));

categoryRouter.post('/', uploadSingleFile('category', 'img'), validate(addValidation), categoryController.addCategory);

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.put('/:id', categoryController.updateCategory);

categoryRouter.delete('/:id', categoryController.deleteCategory);
