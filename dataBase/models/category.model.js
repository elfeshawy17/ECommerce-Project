import { model, Schema, Types } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Too Short'],
        trim: true,
        unique: [true, 'Name Must Be Unique']
    },

    slug: {
        type: String,
        lowerCase: true,
        required: true
    },

    img: String,

    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
});


categorySchema.pre('init', function(doc){
    doc.img = 'http://localhost:3000/uploads/category/' + doc.img;
});


export const Category = model('Category', categorySchema);