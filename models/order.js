const mongoose = require('mongoose');
const moment = require('moment-timezone');

const orderSchema = new mongoose.Schema({
    items: [{
        item: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "item"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String
    },
    date: {
        type: Date,
        default: () => moment().tz('Africa/Cairo').toDate()
    },
    address: {
        type: String,
        required: true,
    }, 
    customer: {
        type: String
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;