import { model, Schema, Types } from "mongoose";


const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Too Short'],
        trim: true
    },

    logo: String,

    slug: {
        type: String,
        lowerCase: true,
        required: true
    },

    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true,
    versionKey: false
}
);


brandSchema.pre('init', function(doc){
    doc.logo = 'http://localhost:3000/uploads/brand/' + doc.logo;
});


export const Brand = model('Brand', brandSchema);