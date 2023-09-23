const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.get_order);
router.get('/:userid', orderController.get_my_orders);
router.post('/:userid', orderController.add_order);
router.get('/delete/:orderid', orderController.delete_order);

module.exports = router;