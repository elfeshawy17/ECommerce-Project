import mongoose from "mongoose";

const url = process.env.DB_URL;

export const dbConnection = mongoose.connect(url).then( console.log('DB Is Connected Successfully') ).catch( err => console.log(err) );