const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.get('/', policyController.getPolicies);
router.post('/', policyController.addPolicy);
router.get('/stats', policyController.getPolicyStats);
router.get('/due-for-renewal', policyController.getDueForRenewal);

module.exports = router;