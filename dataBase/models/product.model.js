import { model, Schema, Types } from "mongoose";


const productSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, 'Too Short'],
        trim: true
    },

    slug: {
        type: String,
        lowerCase: true,
        required: true
    },

    description: {
        type: String,
        required: true,
        minLength: [3, 'Too Short'],
        maxLength: 1000
    },

    imgCover: String,

    images: [String],

    price: {
        type: Number,
        required: true,
        min: 0
    },

    priceAfterDiscount: Number,

    sold: Number,

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },

    rateCount: Number,

    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    },

    brand: {
        type: Types.ObjectId,
        ref: 'Brand'
    },

    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
});


productSchema.pre('init', function(doc){
    const baseUrl = 'http://localhost:3000/uploads/product/';
    doc.imgCover = baseUrl + doc.imgCover;
    doc.images = doc.images.map( file => baseUrl + file);

});


export const Product = model('Product', productSchema);