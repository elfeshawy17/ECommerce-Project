import { Router } from "express";
import productController from "./product.controller.js";
import { uploadFiles} from "../../../uploads/fileUpload.js";
import { addValidation } from "./product.validate.js";
import { validate } from "../../middlewares/validate.js";
import authController from "../auth/auth.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";


export const productRouter = Router();

productRouter.use(authController.protectedRoute, allowedTo('user', 'admin'));

productRouter.post('/', uploadFiles('product', 'imgCover', 'images'), validate(addValidation), productController.addProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete('/:id', productController.deleteProduct);