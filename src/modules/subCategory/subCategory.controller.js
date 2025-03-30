import { SubCategory } from './../../../dataBase/models/subCategory.model.js';
import slugify from 'slugify';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addSubCategory = asyncErrorHandler(

    async (req, res, next) => {

        const {name} = req.body;
    
        const foundSubCategory = await SubCategory.findOne({name});
        if (foundSubCategory) {
            const error = AppError.create('SubCategory Is Already Exists', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        req.body.img = req.file.filename;
        req.body.slug = slugify(req.body.name);
        const SubSubCategory = SubCategory(req.body);
        await SubSubCategory.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {SubSubCategory}
        });
    
    }

);


const getAllSubCategories = asyncErrorHandler(

    async (req, res, next) => {

        const pageNumber = req.query.page * 1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber - 1) * limit;

        const filterObj = {};

        if (req.params.categoryId) filterObj.category = req.params.categoryId;
    
        const Subcategories = await SubCategory.find(filterObj).limit(limit).skip(skip);
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {Subcategories}
        });
    
    }

);


const updateSubCategory = asyncErrorHandler(

    async (req, res, next) => {

        req.body.slug = slugify(req.body.name);
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!subCategory) {
            const error = AppError.create('THis subCategory Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {subCategory}
        });
    
    }

);


const deleteSubCategory = asyncErrorHandler(

    async (req, res, next) => {

        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    
        if (!subCategory) {
            const error = AppError.create('THis subCategory Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);


export default {
    addSubCategory,
    getAllSubCategories,
    updateSubCategory,
    deleteSubCategory
}