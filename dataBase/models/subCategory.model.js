import { model, Schema, Types } from "mongoose";


const subCategorySchema = new Schema({

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

    category: {
        type: Types.ObjectId,
        ref: 'Category'
    }

}, {
    timestamps: true,
    versionKey: false
});


subCategorySchema.pre('init', function(doc){
    doc.img = 'http://localhost:3000/uploads/subCategory/' + doc.img;
});


export const SubCategory = model('SubCategory', subCategorySchema);