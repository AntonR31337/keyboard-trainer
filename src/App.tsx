import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import KeyboardTrainer from "./pages/keyboard-trainer";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Главная",
            },
            {
              key: "/keyboard-trainer",
              icon: <VideoCameraOutlined />,
              label: "Keyboard Trainer",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
              disabled: true,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path='/' element={<h1>Home page</h1>} />
            <Route path='/keyboard-trainer' element={<KeyboardTrainer />} />
            <Route path='*' element={<h1>404 No page</h1>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
