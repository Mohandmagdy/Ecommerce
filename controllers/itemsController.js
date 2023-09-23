const Item = require('../models/item');
const Cart = require('../models/cart');

const getItems = async (req, res) => {
    const items = await Item.find();
    res.render('items', {items});
};

const getDetails = async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    res.render('details', {element:item});
}

const getAdd = (req, res) => {
    res.render('add');
}

const postAdd = (req, res) => {
    const values = req.body;
    
    Item.create(values)
        .then(result => {
            res.status(201).json({item:result});
            
        }).catch(err => {
            let error = {description: ''};
            if(err.message.includes('item validation failed')){
                Object.values(err.errors).forEach(property => {
                    error[property.path] = property.message;
                });
                res.status(400).json({error});
            }
        });
}

const searchByName = async (req, res) => {
    const content = req.body.content;
    const items = await Item.find({name: {$regex: content, $options: 'i'}});
    res.render('items', {items});
}

const searchByCategory = async (req, res) => {
    const content = req.body.category;
    const items = await Item.find({category: content});
    res.render('items', {items});
};

const getStoreItems = async (req, res) => {
    const id = req.params.id;

    const items = await Item.find({store: id});
    res.render('items', {items});
}

const editItem = async (req, res) => {
    const itemid = req.params.id;
    const quantity = req.body.quantity;

    const result = await Item.findByIdAndUpdate(itemid, { "$set" : { 'count' : quantity }});
}

module.exports = {
    getItems,
    getDetails,
    getAdd,
    postAdd,
    searchByName,
    searchByCategory,
    getStoreItems,
    editItem,
}