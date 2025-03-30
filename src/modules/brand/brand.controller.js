import { Brand } from './../../../dataBase/models/brand.model.js';
import slugify from 'slugify';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addBrand = asyncErrorHandler(

    async (req, res, next) => {

        const {name} = req.body;
    
        const foundBrand = await Brand.findOne({name});
        if (foundBrand) {
            const error = AppError.create('Brand Is Already Exists', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        req.body.logo = req.file.filename;
        req.body.slug = slugify(req.body.name);
        const brand = new Brand(req.body);
        await brand.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {brand}
        });
    
    }

);


const getAllBrands = asyncErrorHandler(

    async (req, res, next) => {

        const pageNumber = req.query.page * 1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber - 1) * limit;
    
        const brands = await Brand.find().limit(limit).skip(skip);
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {brands}
        });
    
    }

);


const updateBrand = asyncErrorHandler(

    async (req, res, next) => {

        req.body.slug = slugify(req.body.name);
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!brand) {
            const error = AppError.create('This brand Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {brand}
        });
    
    }

);


const deleteBrand = asyncErrorHandler(

    async (req, res, next) => {

        const brand = await Brand.findByIdAndDelete(req.params.id);
    
        if (!brand) {
            const error = AppError.create('THis brand Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);



export default {
    addBrand,
    getAllBrands,
    updateBrand,
    deleteBrand
}