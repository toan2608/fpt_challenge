import React, { useEffect} from "react";
import { Input, Button, Dropdown,Space} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./header.css";
import {
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import logo from "../../assets/icons/logo.png";
import { removeLocalStorage } from "../../utils/storageUtils";
import { getLocalStorage } from "../../utils/storageUtils";
// import { authSlice } from "../../features/Auth/AuthSlice";
// import { logOutAction } from "../../features/Auth/AuthSlice";
// import { removeLocalStorage } from "../../utils/storageUtils";
import ModalAccount from "../Modal/modalAccount";
import { httpGetData, httpPostData } from "../../api/common.api";
import ModalChangePass from "../Modal/modalChangePass";

const Header = (item) => {
  const [showModal, setShowModal] = useState(false);
  const [dataDetailUser, setDataDetailUser] = useState({});
  const [showModalPass, setShowModalPass] = useState(false);
  const handleLogOut = async() => {
    removeLocalStorage('username');
    removeLocalStorage('token');
    removeLocalStorage('idUsername');
  };
  const handleSubmitAccount = async () =>{
    setShowModal(true);
    let token = getLocalStorage("token");
    const infoUser = await httpPostData('admin/user',{token: token});
    const detailUser = await httpGetData(`admin/detail_user/${infoUser.data.id}`)
    // detailUser.id = infoUser.data.id;
    console.log(detailUser);
    setDataDetailUser(detailUser)
  }
  const handleSubmitChangePass = ()=>{
    setShowModalPass(true);
  }
  
  const items = [
    {
      label: (
        <a onClick={handleSubmitAccount} style={{ display: "flex", justifyContent: "start"}}>
          Account
        </a>
      ),
      key: "0",
      icon: <UserOutlined />,
    },
    {
      label: (
        <a onClick={handleSubmitChangePass} style={{ display: "flex", justifyContent: "start" }}>
          Change Password
        </a>
      ),
      key: "1",
      icon: <KeyOutlined />,
    },
    {
      label: (
        <a href="" style={{ display: "flex", justifyContent: "start" }}>
          Setting
        </a>
      ),
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: (
        <a href="" style={{ display: "flex" }} onClick={handleLogOut}>
          Sign out
        </a>
      ),
      key: "3",
      icon: <LogoutOutlined />,
    },
  ];
  let name = getLocalStorage('username');
  console.log(name);
  return (
    <>
      <header className="header">
      <img src={logo} height={"45px"} />
        <Input
          placeholder="Tìm kiếm nội dung"
          prefix={<SearchOutlined />}
          className="input-search"
        />
        <span className="user-button-header">
          {(name) ? 
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button style={{width: '100%'}}>{name}</Button>
              </Space>
            </a>
          </Dropdown>
          :<Button href="/login">Login</Button>  
          }
        </span>
      </header>
      {showModal ? <ModalAccount dataDetailUser = {dataDetailUser} isOpen = {showModal} handleCancel={() => setShowModal(false)}/> :""}
      {showModalPass ? <ModalChangePass isOpen = {showModalPass} handleCancel={() => setShowModalPass(false)}/> : ""}
    </>
  );
};

export default Header;
