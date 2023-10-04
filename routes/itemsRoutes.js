const express = require('express');
const itemsController = require('../controllers/itemsController');
const Item = require('../models/item');

const router = express.Router();

router.get('/', itemsController.getItems);
router.get('/add', itemsController.getAdd);
router.post('/searchbyname', itemsController.searchByName);
router.post('/searchbycategory', itemsController.searchByCategory);
router.post('/add', itemsController.postAdd);
router.post('/store/edit/:id', itemsController.store_edit);
router.get('/store/:id', itemsController.getStoreItems);
router.post('/edit/:id', itemsController.editItem);
router.get('/:id', itemsController.getDetails);



module.exports = router;