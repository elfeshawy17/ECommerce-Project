import { model, Schema } from "mongoose";


const couponSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    expire: {
        type: Date,
        required: true
    },

    discount: {
        type: Number,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});

export const Coupon = model('Coupon', couponSchema);