
const knex = require('../configs/knex');

const UserModel = require('../models/user.model');
const userModel = new UserModel();
require('dotenv').config();
const jwt = require('jsonwebtoken');

let UserCtrl = {};

UserCtrl.getDataUser = async (req,res) => {
    // let data = await userModel.queryDatabase(userModel.getAllData());
    // // console.log(data);
    // res.status(200).json(data);
    const token  = req.body.token;
    try {
        // Giải mã token và trả về phần Payload đã giải mã
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        res.status(200).json(decoded);
      } catch (error) {
        // Xử lý lỗi khi giải mã không thành công
        console.error('Error decoding JWT:', error.message);
      }
}
UserCtrl.findUser = async (req,res)=>{
  const id = req.params.id;
  console.log('id of user: ' + id);
  let data = await userModel.queryDatabase(userModel.getDataById(id))
  // console.log(data[0]);
  const{name, email,gender,birthday} = data[0];
  res.status(200).json(data[0]);
}
UserCtrl.updateUser = async(req,res) =>{
  let data = await userModel.updateDataById(req.body,'user',req.body.old_id);
  if(!data) res.status(404).json({
    message: 'Error'
})
else {
    res.status(200).json({
        message: 'Update data successful'
    })
}
}
module.exports = UserCtrl;