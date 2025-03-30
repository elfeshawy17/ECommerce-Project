import { User } from "../../../dataBase/models/user.model.js";
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addAddress = asyncErrorHandler(

    async (req, res, next) => {

        const address = await User.findOneAndUpdate(req.user._id, {$addToSet: {addresses: req.body}}, {new:true});
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {addresses: address.addresses}
        });
    
    }

);

const removeFromeAddresses = asyncErrorHandler(

    async (req, res, next) => {

        const address = await User.findOneAndUpdate(req.user._id, {$pull: {addresses: req.body}}, {new:true});
    
        if (!address) {
            const error = AppError.create("Your Addresses Doesn't Include This Address", 404, HttpStatusText.FAIL);
            return next(error);
        }
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {addresses: address.addresses}
        });
    
    }

);


export default {
    addAddress,
    removeFromeAddresses
}