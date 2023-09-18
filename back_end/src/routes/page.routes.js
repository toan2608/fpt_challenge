

const express = require('express');
const PageCtrl = require('../controllers/PageCtrl');
const Authenticate = require('../middlewares/authenticate');

const router = express.Router();
router.get('/',Authenticate, PageCtrl.home)

module.exports = router;
