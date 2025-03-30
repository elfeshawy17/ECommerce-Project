import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    const [key, token] = req.headers.token.split(" ");
    console.log('token', token, 'key', key);

    if (!token) {
        const error = AppError.create('Token Is Required', 400, HttpStatusText.FAIL);
        return next(error);
    }

    try{

        jwt.verify(token, process.env.JWT_SECRET_KEY)
        next();

    } catch (err) {
        return next(err);
    }

}
