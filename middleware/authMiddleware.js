const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');
const Item = require('../models/item');

const check_user = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'increaseupto1', async (err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }
            else{
                let user = await User.findById(decodedToken.id);
                if(user.role == 'customer'){
                    let cart = await Cart.findOne({userid: decodedToken.id});
                    res.locals.cart = cart;
                }
                res.locals.user = user;
                next();
            }
        })
    } else{
        res.locals.user = null;
        next();
    }
};

const requireAuth  = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'increaseupto1', async (err, decodedToken) => {
            if(err){
                res.redirect('/auth/login');
            } else{
                next();
            }
        })
    } else{
        res.redirect('/auth/login');
        next();
    }
};

module.exports = {
    check_user,
    requireAuth
}