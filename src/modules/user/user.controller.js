import { User } from './../../../dataBase/models/user.model.js';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addUser = asyncErrorHandler(

    async (req, res, next) => {

        const user = new User(req.body);
        await user.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {user}
        });
    
    }

);


const getAllUsers = asyncErrorHandler(

    async (req, res, next) => {

        const pageNumber = req.query.page * 1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber - 1) * limit;
    
        const users = await User.find().limit(limit).skip(skip);
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {users}
        });
    
    }

);


const updateUser = asyncErrorHandler(

    async (req, res, next) => {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!user) {
            const error = AppError.create('This User Is Not Found', 404, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {user}
        });
    
    }

);


const deleteUser = asyncErrorHandler(

    async (req, res, next) => {

        const user = await User.findByIdAndDelete(req.params.id);
    
        if (!user) {
            const error = AppError.create('THis user Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);


export default {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser
}