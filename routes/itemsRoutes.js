const express = require('express');
const itemsController = require('../controllers/itemsController');
const Item = require('../models/item');

const router = express.Router();

router.get('/', itemsController.getItems);
router.get('/add', itemsController.getAdd);
router.post('/searchbyname', itemsController.searchByName);
router.post('/searchbycategory', itemsController.searchByCategory);
router.post('/add', itemsController.postAdd);
router.get('/:id', itemsController.getDetails);
router.get('/store/:id', itemsController.getStoreItems);
router.post('/edit/:id', itemsController.editItem);


module.exports = router;