import { Review } from './../../../dataBase/models/review.model.js';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addReview = asyncErrorHandler(

    async (req, res, next) => {

        req.body.user = req.user._id;

        const isExist = await Review.findOne({user: req.user._id, product: req.body.product});
        if (isExist) {
            const error = AppError.create('You Already Reviewd This Product', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        const review = new Review(req.body);
        await review.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {review}
        });
    
    }

);


const getAllReviews = asyncErrorHandler(

    async (req, res, next) => {
    
        const reviews = await Review.find();
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {reviews}
        });
    
    }

);


const updateReview = asyncErrorHandler(

    async (req, res, next) => {

        const review = await Review.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new:true});
    
        if (!review) {
            const error = AppError.create('This review Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {review}
        });
    
    }

);


const deleteReview = asyncErrorHandler(

    async (req, res, next) => {

        const review = await Review.findByIdAndDelete(req.params.id);
    
        if (!review) {
            const error = AppError.create('This review Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);


export default {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview
}
