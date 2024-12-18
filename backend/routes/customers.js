const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getCustomers);
router.post('/', customerController.addCustomer);
router.get('/stats', customerController.getCustomerStats);

module.exports = router;