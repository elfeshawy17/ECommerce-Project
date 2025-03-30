import AppError from "../../utils/AppError.js";
import HttpStatusText from "../../utils/HttpStatusText.js";


export const allowedTo = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            const error = AppError.create('Unautherized', 400, HttpStatusText.FAIL);
            return next(error);
        } 
        next();
    
    }
}
