import { Cart } from "../../../dataBase/models/cart.model.js";
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';
import { Product } from "../../../dataBase/models/product.model.js";
import { cartTotalPrices } from "../../../utils/cartTotalPrices.js";
import { Coupon } from './../../../dataBase/models/coupon.model.js';


const addCart = asyncErrorHandler(
    async (req, res, next) => {

        const isCartExist = await Cart.findOne({user: req.user._id});
        const product = await Product.findById(req.body.product);
    
        if (!isCartExist) {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body]
            });

            cartTotalPrices(cart);

            await cart.save();
            return res.status(201).json({
                status: HttpStatusText.SUCCESS,
                data: {cart}
            });
        }

        const item = isCartExist.cartItems.find((item) => item.product == req.body.product);

        if (!item) {
            isCartExist.cartItems.push(req.body);
        } else {
            const newQuntitiy = req.body.quantity + item.quantity;
            if (product.stock < newQuntitiy) {
                const error = AppError.create('Out of stock', 400, HttpStatusText.FAIL);
                return next(error);
            }
            item.quantity = newQuntitiy;
        }
    
        cartTotalPrices(isCartExist);

        isCartExist.save();

        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {isCartExist}
        });

    }
);

const updateQuantity = asyncErrorHandler(
    async (req, res, next) => {

        const cart = await Cart.findOne({user: req.user._id});
        if (!cart) {
            const error = AppError.create('Cart is not found', 404, HttpStatusText.FAIL);
            return next(error);
        }

        const item = cart.cartItems.find((item) => item._id == req.body.product);
        if (!item) {
            const error = AppError.create('Product is not found', 404, HttpStatusText.FAIL);
            return next(error);
        }

        item.quantity = req.body.quantity;
        cartTotalPrices(cart);
        await cart.save();

        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: cart
        });

    }
);

const deleteProductFromCart = asyncErrorHandler(
    async (req, res, next) => {

        const cart = await Cart.findOneAndUpdate(
            {user: req.user._id},
            {$pull: {cartItems: {product: req.body.product}}},
            {new: true}
        );

        if (!cart) {
            const error = AppError.create('Cart is not found', 404, HttpStatusText.FAIL);
            return next(error);
        }

        cartTotalPrices(cart);
        await cart.save();

        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: null
        });

    }
);

const applyCoupon = asyncErrorHandler(
    async (req, res, next) => {

        const coupon = await Coupon.findOne({code: req.body.code, expire:{$gte: Date.now()}});
        if (!coupon) {
            const error = AppError.create('Invalid coupon.', 404, HttpStatusText.FAIL);
            return next(error);
        }

        const cart = await Cart.findOne({user: req.user._id});
        if (!cart) {
            const error = AppError.create('Cart is not found.', 404, HttpStatusText.FAIL);
            return next(error);
        }

        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
        cart.discount = coupon.discount;

        cart.save();

        res.status(200).json({
            status: HttpStatusText.SUCCESS,
            data: cart
        });

    }
);

export default {
    addCart,
    updateQuantity,
    deleteProductFromCart,
    applyCoupon
}