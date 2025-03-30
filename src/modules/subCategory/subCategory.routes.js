import { Router } from "express";
import subCategoryController from "./subCategory.controller.js";
import { uploadSingleFile } from "../../../uploads/fileUpload.js";
import { validate } from "../../middlewares/validate.js";
import { addValidation } from "./subCategory.validate.js";
import authController from "../auth/auth.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";


export const subCategoryRouter = Router({mergeParams: true});

subCategoryRouter.use(authController.protectedRoute, allowedTo('admin', 'manager'));

subCategoryRouter.post('/', uploadSingleFile('subCategory', 'img'), validate(addValidation), subCategoryController.addSubCategory);

subCategoryRouter.get('/', subCategoryController.getAllSubCategories);

subCategoryRouter.put('/:id', subCategoryController.updateSubCategory);

subCategoryRouter.delete('/:id', subCategoryController.deleteSubCategory);