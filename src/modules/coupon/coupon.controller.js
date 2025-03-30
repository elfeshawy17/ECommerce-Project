import { Coupon } from './../../../dataBase/models/coupon.model.js';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addCoupon = asyncErrorHandler(

    async (req, res, next) => {

        const {code} = req.body;
    
        const exist = await Coupon.findOne({code});
        if (exist) {
            const error = AppError.create('Coupon Is Already Exists', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        const coupon = new Coupon(req.body);
        await coupon.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {coupon}
        });
    
    }

);

const getAllCoupons = asyncErrorHandler(

    async (req, res, next) => {

        const coupons = await Coupon.find();
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {coupons}
        });
    
    }

);

const updateCoupon = asyncErrorHandler(

    async (req, res, next) => {

        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!coupon) {
            const error = AppError.create('This coupon Is Not Found', 404, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {coupon}
        });
    
    }

);

const deleteCoupon = asyncErrorHandler(

    async (req, res, next) => {

        const coupon = await Coupon.findByIdAndDelete(req.params.id, req.body, {new:true});
    
        if (!coupon) {
            const error = AppError.create('This coupon Is Not Found', 404, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {coupon}
        });
    
    }

);

export default {
    addCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon
}