const Cart = require('../models/cart');
const Item = require('../models/item');

let items = [];

const get_cart = async (req, res) => {
    const id = req.params.id;
    const cart = await Cart.findById(id).populate('items.item');
    res.render('cart', {items: cart.items});
};

const post_add = (req, res) => {
    const userId = req.params.userid;
    const itemId = req.params.itemid;
    const quantity = req.body.quantity;

    Cart.findOne({ userid: userId , items: { $elemMatch: {item: itemId}}})
        .then(result => {
            if(result){
                Cart.updateOne(
                    { userid: userId , 'items.item' : itemId}, 
                    { $inc: { 'items.$.quantity': quantity }}
                        ).then(result => {
                            res.json(result);
                        }).catch(err => {
                            console.log(err);
                })
            }
            else{
                Cart.updateOne(
                    { userid: userId }, 
                    { $push: { items: { item: itemId, quantity } } }
                        ).then(result => {
                            res.json(result);
                        }).catch(err => {
                            console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })

    
    
};

const get_delete = async (req, res) => {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    console.log(cartId, itemId);

    const result = await Cart.updateOne({ _id: cartId }, { $pull: { items: {item: itemId} } });
    console.log('result: ', result);

    res.redirect('/items');
};

const cart_Edit = (req, res) => {
    const cart = req.body.cart;
    const item = req.body.item;
    const quantity = req.body.quantity;

    Cart.updateOne(
        { _id: cart._id , 'items.item' : item._id}, 
        { "$set": { "items.$.quantity": quantity } }
            ).then(result => {
                res.json(result);
            }).catch(err => {
                console.log(err);
    });
}

module.exports = {
    get_cart,
    post_add,
    get_delete,
    cart_Edit
};