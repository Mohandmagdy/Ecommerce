const Cart = require('../models/cart');
const Item = require('../models/item');
const Order = require('../models/order');

const get_order = (req, res) => {
    res.render('order');
};

const add_order = async (req, res) => {
    const userId = req.params.userid;
    const address = req.body.address;
    let check = 1;
    let mx = {};
    const cart = await Cart.findOne({userid: userId}).populate('items.item');

    cart['items'].forEach(async (element) => {
        if(element.item && element.item.count < element.quantity){
            check = 0;
            mx[element.item.name] = element.item.count;
        }
    });
    if(check){

        cart['items'].forEach(async (element) => {
            if(element.item){
                const decrease = element.quantity * -1;
                const result = await Item.findByIdAndUpdate(element.item._id, { $inc: { count: decrease } });
            }
        });

        const newOrder = {
            items: cart.items,
            status: 'Shipping',
            address,
            customer: userId
        };

        Order.create(newOrder)
            .then(result => {
            }).catch(err => {
                consolel.log(err);
            });

        Cart.updateOne({userid: userId}, {$set: { items: []}})
            .then(result => {

            }).catch(err => {
                console.log(err);
            });

        res.json({'done': 'Order has been recorded successfully'});
    }
    else{
        res.json(mx);
    }
};

const get_my_orders = async (req, res) => {
    const id = req.params.userid;
    const orders = await Order.find({customer: id}).populate('items.item');
    res.render('orders', {orders});
};

const delete_order = (req, res) => {
    const orderId = req.params.orderid;
    

    Order.findByIdAndDelete(orderId)
        .then(result => {
            result.items.forEach(element => {
                Item.findByIdAndUpdate(element.item, { '$inc' : { count : element.quantity }})
                    .then(result => {

                    }).catch(err => {
                        console.log(err);
                    });
            })
            res.redirect('/items');
        }).catch(err => {
            console.log(err);
        });
};

module.exports = {
    get_order,
    add_order,
    get_my_orders,
    delete_order
}