import { model, Schema, Types } from "mongoose";


const reviewSchema = new Schema({

    comment: String,

    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    user: {
            type: Types.ObjectId,
            ref: 'User'
    },

    product: {
        type: Types.ObjectId,
        ref: 'Product'
    }

}, {
    timestamps: true,
    versionKey: false
});


reviewSchema.pre(/^find/, function(){
    this.populate("user", "name"),
    this.populate("product")
});


export const Review = model('Review', reviewSchema);