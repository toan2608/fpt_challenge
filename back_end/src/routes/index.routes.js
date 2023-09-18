

const express = require('express');
const adminRoutes = require('./admin.routes');
const authRoutes = require('./auth.routes');
const Authenticate = require('../middlewares/authenticate');
const PageCtrl = require('../controllers/PageCtrl');
const UserCtrl = require('../controllers/UserCtrl');
const router = express.Router();

// router.post('/', PageCtrl.home2)
router.get('/', PageCtrl.home);
// router.post('/get_data_to_date', PageCtrl.getData);
router.post('/:typeof_data',Authenticate, PageCtrl.getDataFollowTypeof);
router.use('/admin',adminRoutes);
router.use('/auth', authRoutes);

module.exports = router;
