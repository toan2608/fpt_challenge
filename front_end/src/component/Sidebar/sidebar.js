import { UnorderedListOutlined, FileTextOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MenuBar from '../MenuBar/menubar';
import { getLocalStorage } from '../../utils/storageUtils';
const { Header, Content, Sider } = Layout;


const MenuList = () => [
  {
    key: "/",
    title: "Dashboard",
    icon: <HomeOutlined />,
    isHide: false,
    url: "/",
  },
  // {
  //   key: "/my_account",
  //   title: "Tài khoản",
  //   icon: <UserOutlined />,
  //   isHide: false,
  //   url: "/account",
  // },
];

const Sidebar = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  // const token = getLocalStorage('')

  return (
    <Sider
        width={200}
        style={{ background: colorBgContainer, height: 648}}
    >
        {/* <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
            height: '100%',
            borderRight: 0,
        }}
        items={MenuList()}
        /> */}
        <MenuBar menuList={MenuList()} mode="inline" />
    </Sider>
  )
    
};
export default Sidebar;