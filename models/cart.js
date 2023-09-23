const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    items: [{
        item: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "item"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    price: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;