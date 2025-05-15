import { Router } from "express";
import productController from "./product.controller.js";
import { uploadFiles} from "../../../uploads/fileUpload.js";
import { addValidation } from "./product.validate.js";
import { validate } from "../../middlewares/validate.js";
import authController from "../auth/auth.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";


export const productRouter = Router();

productRouter.use(authController.protectedRoute);

productRouter.post('/', allowedTo('admin'), uploadFiles('product', 'imgCover', 'images'), validate(addValidation), productController.addProduct);

productRouter.get('/', allowedTo('admin'), productController.getAllProducts);

productRouter.put('/:id', allowedTo('admin'), productController.updateProduct);

productRouter.delete('/:id', allowedTo('admin'), productController.deleteProduct);