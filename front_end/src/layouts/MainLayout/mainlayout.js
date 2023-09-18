import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Col, Menu, theme } from 'antd';
import React from 'react';
import HeaderUser from '../../component/Header/header';
import Sidebar from '../../component/Sidebar/sidebar';
import "./mainlayout.css";
const { Header, Content, Sider } = Layout;

const MainLayout = ({children}) => {
  const {
    // token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header>
        <HeaderUser />
      </Header>
      <Layout>
        <Layout>
            <Sidebar/>
            <Layout>
                <Content className="main-content">
                    <Col span={22} offset={1} className="children-content">
                        <div className="content">{children}</div>
                    </Col>
                </Content>
            </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;