import { model, Schema } from "mongoose";


const couponSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    expire: Date,

    discount: Number

}, {
    timestamps: true,
    versionKey: false
});

export const Coupon = model('Coupon', couponSchema);