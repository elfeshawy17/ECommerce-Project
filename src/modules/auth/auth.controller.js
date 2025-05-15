import { User } from "../../../dataBase/models/user.model.js";
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const register = asyncErrorHandler(

    async (req, res, next) => {

        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        res.status(201).json({
                    status: HttpStatusText.SUCCESS,
                    data: {
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                        token
                    }
                });

    }

);


const login = asyncErrorHandler(

    async (req, res, next) => {

        const user = await User.findOne({email: req.body.email});
    
        if (user && bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
            return res.status(201).json({
                status: HttpStatusText.SUCCESS,
                data: {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                    token
                }
            });
        }

        const error = AppError.create('Invalid Email or Password', 400, HttpStatusText.FAIL);
        return next(error);

    }

);


const changePassword = asyncErrorHandler(

    async (req, res, next) => {

        const user = await User.findOne({email: req.body.email});
    
        if (user && bcrypt.compareSync(req.body.password, user.password)){
        
            const user = await User.findOneAndUpdate(
                {email: req.body.email},
                {password: req.body.newPassword, passwordChangedAt: Date.now()},
                {new: true}
            );
        
            const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
            return res.status(200).json({
                status: HttpStatusText.SUCCESS,
                data: {user, token}
            });
    
        }

        const error = AppError.create('Invalid Email or Password', 400, HttpStatusText.FAIL);
        return next(error);

    }

);


const protectedRoute = asyncErrorHandler(

    async (req, res, next) => {

        const {token} = req.headers;

        if (!token) {
            const error = AppError.create('Token is required', 400, HttpStatusText.FAIL);
            return next(error);
        }

        let userPayload = null;

        try{
            userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            const error = AppError.create('Invalid Token', 400, HttpStatusText.FAIL);
            return next(error);
        }

        const user = await User.findById(userPayload.userId);

        req.user = user;
        next();

    }

);


export default {
    register,
    login,
    changePassword,
    protectedRoute
}