const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/:id', cartController.get_cart);
router.post('/:userid/:itemid', cartController.post_add);
router.get('/delete/:cartId/:itemId', cartController.get_delete);
router.post('/edit', cartController.cart_Edit);

module.exports = router;