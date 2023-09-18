
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const knex = require("../configs/knex");
let AuthCtrl = {};
/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { use } = require("../configs/express");
const { createAccessToken } = require("../utils/Token");
const { hashPassword } = require("../utils/bcrypt");
const userModel = new UserModel();

AuthCtrl.insertToken = async function (accessToken, refreshToken){
    await knex('authen').insert({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
}
AuthCtrl.login =  async (req, res, next) => {
    let {email,password} = req.body;
    let user = await userModel.queryDatabase(userModel.searchPerson(email));
    bcrypt.compare(password,user[0].password, (err,same)=>{
        if(same){
            const accessToken = jwt.sign(
                {
                    id: user[0].id,
                    email: user[0].email,
                    password: user[0].password,
                },
                    process.env.JWT_KEY,
                {
                    expiresIn: "600s"
                }
            )
            const refreshToken = jwt.sign(
                {
                    id: user[0].id,
                    email: user[0].email,
                    password: user[0].password,
                },
                process.env.JWT_REFRESH_KEY,
                {
                    expiresIn: "365d"
                }
            )
            AuthCtrl.insertToken(accessToken,refreshToken); // insert accessToken and refreshToken in authen
            res.status(200).json({
                success: true,
                message: 'Bạn đã đăng đăng nhập thành công',
                token: accessToken,
                refreshToken: refreshToken,    
                user: user[0]
            })
        }
        else{
            res.status(403).json({
                success: false,
                message: "Tài khoản mật khẩu không chính xác"
            })
        }
    })
              
          
}
  // connection.query('SELECT * FROM user WHERE email= ?',req.body.email,(err,user)=>{
  //     console.log(user);
  //     console.log(req.body);
  // .fetch({ require: false })
  

  // })
AuthCtrl.register = async (req,res) =>{
    req.body.password = await hashPassword(req.body.password);
    console.log(req.body.password);
    let data = req.body;
    data.created_id = 99;
    data.created_at = new Date();
    data.updated_id = 99;
    data.updated_at = new Date();
    data.delete_flag = 0;
    data.old_id = 0;
    let insert = await knex('user').insert(data);
    if(insert){
        res.status(200).json({
            success: true,
            message: 'Bạn đã đăng kí tài khoản thành công',
        })
    }
    else{
        res.status(403).json({
            success: false,
            message: 'Lỗi',
        })
    }
}
AuthCtrl.logout =async function (req,res,next) {
  const accessToken = req.headers.accessToken;
    if(!accessToken){
      res.status(403).json({
        success: false,
        message: "Bạn chưa đăng nhập!"
      })
    }
    else{
      jwt.verify(accessToken,process.env.JWT_ACCESS_KEY, (err,user)=>{
        if(err) res.status(403).json({
          success: false,
          message: "Token không đúng"
        })
        
        //Xóa accessToken trong bảng authen2 và xóa trong localStorage
      })
    }
}
AuthCtrl.changePassword = async(req,res)=>{
    let {id,pass,new_pass,confirm_pass} = req.body;
    let user = await userModel.queryDatabase(userModel.getDataById(id));
    let hashPass = await hashPassword(new_pass);
    console.log(hashPass);
    bcrypt.compare(pass,user[0].password,(err,same)=>{
        if(same){
            if(new_pass !== confirm_pass){
                res.status(403).json({
                    message: 'Mật khẩu mới và xác nhận mật khẩu mới không giống nhau',
                })
            }
            else{
                user[0].password = hashPass;
                AuthCtrl.updatePass(user[0]);
                res.status(200).json({
                    message: 'Bạn đã thay đổi mật khẩu thành công',
                })
            }
        }
        else{
            res.status(403).json({
                message: 'Mật khẩu hiện tại sai',
            })
        }
    })
}
AuthCtrl.updatePass = async (param)=>{
    await userModel.updateDataById(param,'user', param.id);
}
module.exports = AuthCtrl;
