import { model, Schema } from "mongoose"


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    totalPriceAfterDiscount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Cart = model('Cart', cartSchema);