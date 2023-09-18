

const express = require('express');
const AuthCtrl = require('../controllers/AuthCtrl');
const Authenticate = require('../middlewares/authenticate');
const router = express.Router();


router.post('/login', AuthCtrl.login)
router.post('/register', AuthCtrl.register)
router.post('/change_password',Authenticate, AuthCtrl.changePassword)

module.exports = router;