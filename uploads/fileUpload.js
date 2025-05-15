import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import AppError from '../utils/AppError.js';
import HttpStatusText from '../utils/HttpStatusText.js';


export const fileUpload = (folder) => {

    const uploadPath = `./uploads/${folder}`;

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, {recursive: true});
    }


    const storage = multer.diskStorage({
    
        destination: (req, file, cb) => { cb(null, uploadPath) },

        filename: (req, file, cb) => { cb(null, uuidv4()+file.originalname) }
    });


    const fileFilter = (req, file, cb) => {

        if (file.mimetype.startsWith('image')){
            cb(null, true)
        } else {
            const error = AppError.create('Only image files are allowed', 400, HttpStatusText.FAIL);
            cb (error, false)
        }

    }

    return multer({storage, fileFilter});

}


export const uploadSingleFile = (folderName, fileName) => fileUpload(folderName).single(fileName);

export const uploadFiles = (folderName, FieldOfSingleUpload, FieldOfMultiUpload) => {
    return fileUpload(folderName).fields([
        {name: FieldOfSingleUpload, maxCount: 1},
        {name: FieldOfMultiUpload, maxCount: 5}
    ]);
}

