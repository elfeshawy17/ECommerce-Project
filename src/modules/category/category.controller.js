import { Category } from './../../../dataBase/models/category.model.js';
import slugify from 'slugify';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';



const addCategory = asyncErrorHandler(

    async (req, res, next) => {

        const {name} = req.body;
    
        const foundCategory = await Category.findOne({name});
        if (foundCategory) {
            const error = AppError.create('Category Is Already Exists', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        req.body.img = req.file.filename;
        req.body.slug = slugify(req.body.name);
        const category = new Category(req.body);
        await category.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {category}
        });
    
    }

);

const getAllCategories = asyncErrorHandler(

    async (req, res, next) => {

        const pageNumber = req.query.page * 1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber - 1) * limit;
    
        const categories = await Category.find().limit(limit).skip(skip);
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {categories}
        });
    
    }

);

const updateCategory = asyncErrorHandler(

    async (req, res, next) => {

        req.body.slug = slugify(req.body.name);
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!category) {
            const error = AppError.create('THis Category Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {category}
        });
    
    }

);

const deleteCategory = asyncErrorHandler(

    async (req, res, next) => {

        const category = await Category.findByIdAndDelete(req.params.id);
    
        if (!category) {
            const error = AppError.create('THis Category Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);



export default {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};