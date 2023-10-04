const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const itemsRoutes = require('./routes/itemsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Cart = require('./models/cart');
const Item = require('./models/item');
const Order = require('./models/order');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb+srv://honda:baba@cluster0.ggicybj.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });

app.get('*', authMiddleware.check_user);
app.post('*', authMiddleware.check_user);
app.get('/', (req, res) => {
    res.redirect('/items');
});
app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);


