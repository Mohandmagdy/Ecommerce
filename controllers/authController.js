const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');
const cookieParser = require('cookie-parser');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    const token = jwt.sign({id}, 'increaseupto1', {
        expiresIn:maxAge
    });
    return token;
};

const handleErrors = (err) => {
    const errors = {email: '', password: '', phone: ''};
    if(err.message == 'incorrect email'){
        errors.email = 'Incorrect email address';
    }
    if(err.message == 'incorrect password'){
        errors.password = 'Incorrect password';
    }
    if(err.code === 11000){
        errors.email = 'Email is already used';
        return errors;
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(property => {
            errors[property.path] = property.message;
        });
    }
    return errors;
};

const get_signup = (req, res) => {
    res.render('signup');
};

const get_login = (req, res) => {
    res.render('login');
};

const post_signup = (req, res) => {
    const values = req.body;
    
    // create user
    User.create(values)
        .then(result => {

            //create cart for user
            if(result.role == 'customer'){
                Cart.create({userid: result.id})
                    .then(cart_result => {

                    }).catch(err => {
                        console.log(err);
                    });
            }
            /////////////////////
            
            const token = createToken(result.id);
            res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly: true});
            res.status(201).json({user: result});
        }).catch(err => {
            console.log(err);
            const errors = handleErrors(err);
            res.status(401).json({errors});
        });
};

const post_login = (req, res) => {
    const values = req.body;
    values.password = (values.password).toString();

    User.login(values.email, values.password)
        .then(result => {
            const token = createToken(result.id);
            res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly: true});
            res.status(200).json({user: result});
        }).catch(err => {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        })
};

const get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('user', '', {maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    get_login,
    get_signup,
    post_signup,
    post_login,
    get_logout
};