import { Order } from './../../../dataBase/models/order.model.js';
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';
import { Cart } from '../../../dataBase/models/cart.model.js';
import { Product } from '../../../dataBase/models/product.model.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createCashOrder = asyncErrorHandler(
    async (req, res, next) => {

        const cart = await Cart.findOne({user: req.user._id});
        if (!cart) {
            const error = AppError.create('Cart is not found.', 404, HttpStatusText.FAIL);
            return next(error);
        }

        const totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalPrice;

        const order = new Order({
            user: req.user._id,
            orderItems: cart.cartItems,
            totalOrderPrice,
            shippingAddress: req.body.shippingAddress
        });
        await order.save();

        const options = cart.cartItems.map( (item) => {
            return (
                {
                    updateOne: {
                        filter: {_id: {$in: item.product}},
                        update: {$inc: {sold: item.quantity, stock: -item.quantity}}
                    }
                }
            )
        });

        await Product.bulkWrite(options);

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data: {order}
        });

    }
);


const checkoutOrder = asyncErrorHandler(
    async(req,res,next)=>{

        const order = await Order.findById(req.params.id);
        if(!order){
            const error = AppError.create('Order not found', 400, HttpStatusText.FAIL);
            return next(error);
        }
        
        const totalOrderPrice = order.totalOrderPrice;
        if (!totalOrderPrice || isNaN(totalOrderPrice)) {
            const error = AppError.create('Invalid order price', 400, HttpStatusText.FAIL);
            return next(error);
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Math.round(totalOrderPrice * 100),
                        product_data: {
                            name: req.user.name,
                        }
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: req.user.email,
            client_reference_id: req.params.id,
        });

        res.status(201).json({
            status: HttpStatusText.SUCCESS,
            data:{session}
        });

});


export default {
    createCashOrder,
    checkoutOrder
}