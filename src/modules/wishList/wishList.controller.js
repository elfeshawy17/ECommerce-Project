import { User } from "../../../dataBase/models/user.model.js";
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addWishList = asyncErrorHandler(

    async (req, res, next) => {

        const wishList = await User.findOneAndUpdate(req.user._id, {$addToSet: {wishList: req.body.product}}, {new:true});
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {wishList: wishList.wishList}
        });
    
    }

);

const removeFromWishList = asyncErrorHandler(

    async (req, res, next) => {

        const wishList = await User.findOneAndUpdate(req.user._id, {$pull: {wishList: req.body.product}}, {new:true});
    
        if (!wishList) {
            const error = AppError.create("Your WishList Doesn't Include This Product", 404, HttpStatusText.FAIL);
            return next(error);
        }
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {wishList: wishList.wishList}
        });
    
    }

);


export default {
    addWishList,
    removeFromWishList
}