import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            price: Number
        }
    ],
    totalOrderPrice: {
        type: Number,
        default: 0
    },
    shippingAddress: {
        city: String,
        street: String,
        phone: String
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Order = model('Order', orderSchema);