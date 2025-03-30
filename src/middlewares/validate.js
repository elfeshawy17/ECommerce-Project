import AppError from "../../utils/AppError.js";
import HttpStatusText from "../../utils/HttpStatusText.js";


export const validate = (schema) => {

    return (req, res, next) => {

        let imgProperty = 'img';
        if (schema.describe().keys.imgCover) {
            imgProperty = 'imgCover';
        } else if (schema.describe().keys.images) {
            imgProperty = 'images';
        }

        const data = {...req.body, ...req.params, ...req.query};

        if (imgProperty == 'imgCover') {
            data[imgProperty] = req.file;
        } else if (imgProperty == 'images') {
            data[imgProperty] = req.files;
        } else {
            data[imgProperty] = req.file;
        }

        const {err} = schema.validate(data, {abortEarly: false});
        if (!err) {
            return next();
        } else {
            let errorMessage = err.details.map( (err) => {
                return err.message;
            });
            const error = AppError.create(errorMessage, 400, HttpStatusText.FAIL);
            return next(error);
        }

    }

}