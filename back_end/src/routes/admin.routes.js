

const express = require('express');
const UserCtrl = require('../controllers/UserCtrl');
const Authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.get('/detail_user/:id',Authenticate, UserCtrl.findUser);
router.put('/user/:id/update',Authenticate, UserCtrl.updateUser)

router.post('/user',Authenticate, UserCtrl.getDataUser);

module.exports = router;
