const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'item description must be more than 20 characters']
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;

