const path = require('path');

const express = require('express');

const uploadsController = require('../controllers/uploads');

const router = express.Router();

// /a => POST
router.post('/', uploadsController.postFile);

// router.get('/edit-product/:productId', isAuth, uploadsController.getEditProduct);

module.exports = router;
