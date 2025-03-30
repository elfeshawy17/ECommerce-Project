import { Router } from "express";
import brandController from "./brand.controller.js";
import { uploadSingleFile } from "../../../uploads/fileUpload.js";
import { addValidation } from "./brand.validate.js";
import { validate } from "../../middlewares/validate.js";
import authController from "../auth/auth.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";

export const brandRouter = Router();

brandRouter.use(authController.protectedRoute, allowedTo('admin', 'manager'));

brandRouter.post('/', uploadSingleFile('brand', 'logo'), validate(addValidation), brandController.addBrand);

brandRouter.get('/', brandController.getAllBrands);

brandRouter.put('/:id', brandController.updateBrand);

brandRouter.delete('/:id', brandController.deleteBrand);