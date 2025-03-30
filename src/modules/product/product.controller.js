import { Product } from './../../../dataBase/models/product.model.js';
import slugify from 'slugify';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';


const addProduct = asyncErrorHandler(

    async (req, res, next) => {

        const {title} = req.body;
    
        const foundProduct = await Product.findOne({title});
        if (foundProduct) {
            const error = AppError.create('Product Is Already Exists', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        req.body.images = req.files.images.map(file => file.filename);
        req.body.imgCover = req.files.imgCover[0].filename;
        req.body.slug = slugify(req.body.title);
        const product = new Product(req.body);
        await product.save();
    
        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {product}
        });
    
    }

);


const getAllProducts = asyncErrorHandler(

    async (req, res, next) => {

        const pageNumber = req.query.page * 1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber - 1) * limit;

        let filterObj = structuredClone(req.query);
        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (value) => `$${value}`);
        filterObj = JSON.parse(filterObj);
    
        const products = await Product.find(filterObj).limit(limit).skip(skip);
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {products}
        });
    
    }

);


const updateProduct = asyncErrorHandler(

    async (req, res, next) => {

        req.body.slug = slugify(req.body.title);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
        if (!product) {
            const error = AppError.create('This Product Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: {product}
        });
    
    }

);


const deleteProduct = asyncErrorHandler(

    async (req, res, next) => {

        const product = await Product.findByIdAndDelete(req.params.id);
    
        if (!product) {
            const error = AppError.create('This Product Is Not Found', 400, HttpStatusText.FAIL);
            return next(error);
        }
    
        res.status(200).json({
            status: HttpStatusText.SUCCESS
        });
    
    }

);


export default {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}