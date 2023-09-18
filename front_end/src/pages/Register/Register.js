import React, { useState } from "react";
import { Row, Col, Image, Upload, Form, Input, Button, Select, DatePicker } from "antd";
import avatarDemo from "../../assets/icons/avatar.svg";
import { httpPostData } from "../../api/common.api";
import { showNotiSuccess } from "../../component/Modal/notification";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
export default function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [gender,setGender] = useState('');
  const [birthday,setBirthday] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const values = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        birthday: birthday,
    };
    let wait = await httpPostData('auth/register',values);
    console.log(wait);
    if(wait){
      showNotiSuccess(wait.data.message);
      setTimeout(()=>{
        navigate('/login');
      },500)
    }
};

  return (
    <>
      
      <div className="container-login">
            <div class="cont" style={{position: 'relative'}}>
              <div style={{position: 'absolute', top: 40, left: 0}}>
                      <button style={{color: 'blue',textDecoration: 'underline', fontSize: 15}} onClick={()=> navigate('/login')}>Quay lại</button>
              </div>
              <div class="form sign-in" >
              <button style={{ marginTop:-50}}></button>
                  <div className="container-form-login">
                      <h2>Đăng kí tài khoản,</h2>
                      <form action="#">
                        <label>
                          <span>Họ tên</span>
                          <input type="name" name="name" required onChange={(e)=> setName(e.target.value)} placeholder="Họ và tên"/>
                        </label>
                        <label>
                          <span>Email</span>
                          <input type="email" name="email" required onChange={(e)=> setEmail(e.target.value)} placeholder="Email"/>
                        </label>
                        <label>
                          <span>Mật khẩu</span>
                          <input type="password" name="password" required onChange={(e)=> setPassword(e.target.value)} placeholder="Password"/>
                        </label>
                        <label>
                          <span>Giới tính</span>
                          <input type="gender" name="gender" required onChange={(e)=> setGender(e.target.value)} placeholder="Giới tính"/>
                        </label>
                        <label>
                          <span>Ngày sinh</span>
                          <input type="birthday" name="birthday" required onChange={(e)=> setBirthday(e.target.value)} placeholder="Ngày sinh"/>
                        </label>
                        <button style={{backgroundColor: "orange", marginTop:10}} onClick={handleSubmit}>Đăng kí</button>

                      </form>
                  </div>
              </div>
              <div class="sub-cont">
                  <div class="img">
                      <div class="img__text m--up"></div>
                  </div>   
              </div>
              </div>

              <a href="https://dribbble.com/shots/3306190-Login-Registration-form" target="_blank" class="icon-link">
                  <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png" />
              </a>
          </div>
    </>
  )
}


