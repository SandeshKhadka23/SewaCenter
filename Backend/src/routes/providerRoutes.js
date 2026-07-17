const express = require('express');
const { apply } = require('../controllers/providerController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.post('/apply', requireAuth, apply);

module.exports = router;