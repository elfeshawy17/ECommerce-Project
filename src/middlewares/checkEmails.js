import { User } from './../../dataBase/models/user.model.js';
import AppError from '../../utils/AppError.js';
import HttpStatusText from '../../utils/HttpStatusText.js';


export const checkEmail = async (req, res, next) => {

    const {email} = req.body;
    const isFound = await User.findOne({email});

    if (isFound) {
        const error = AppError.create('Email Is Already Exists', 400, HttpStatusText.FAIL);
        return next(error);
    }
    next();

};