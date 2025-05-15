import express from 'express'
import 'dotenv/config'
import { dbConnection } from './dataBase/dB.connection.js';
import { categoryRouter } from './src/modules/category/category.routes.js';
import HttpStatusText from './utils/HttpStatusText.js';
import { brandRouter } from './src/modules/brand/brand.routes.js';
import { subCategoryRouter } from './src/modules/subCategory/subCategory.routes.js';
import { productRouter } from './src/modules/product/product.routes.js';
import { userRouter } from './src/modules/user/user.routes.js';
import { authRouter } from './src/modules/auth/auth.routes.js';
import { reviewRouter } from './src/modules/reviews/review.routes.js';
import { wishListRouter } from './src/modules/wishList/wishList.routes.js';
import { addressesRouter } from './src/modules/adresses/addressess.routes.js';
import { couponRouter } from './src/modules/coupon/coupon.routes.js';
import { cartRouter } from './src/modules/cart/cart.routes.js';
import { orderRouter } from './src/modules/order/order.routes.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/api/category', categoryRouter);

app.use('/api/subCategory', subCategoryRouter);

app.use('/api/brand', brandRouter);

app.use('/api/product', productRouter);

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.use('/api/review', reviewRouter);

app.use('/api/wishList', wishListRouter);

app.use('/api/addresses', addressesRouter);

app.use('/api/coupon', couponRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRouter);

app.use('/uploads', express.static('./uploads'));


// Global Error Handler
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: HttpStatusText.ERROR, 
        message: 'Route not found',
        data: null
    })
});

app.use( (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || HttpStatusText.ERROR,
        message: error.message || 'Internal Server Error',
        data: null
    });
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));