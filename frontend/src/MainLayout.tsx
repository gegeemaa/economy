import React from "react";
import { AccountBookOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import FakturaTable from "./components/FakturaTable";

const { Content, Sider } = Layout;

const menuDataOriginal = [
  {
    label: "Faktura",
    icon: AccountBookOutlined,
    children: [
      // { label: "Incoming", linkcomponent: "/incomingInvoice" },
      { label: "Outgoing", linkcomponent: "/outgoingInvoice" },
    ],
  },
];

const menuData = menuDataOriginal.map((item, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.label,
    children: item.children.map((subitem) => {
      return {
        key: subitem.linkcomponent,
        label: subitem.label,
      };
    }),
  };
});

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ padding: 0, margin: 0 }}>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={onClick}
            items={menuData}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route index element={<FakturaTable />} />
              {/* <Route
                path="/incomingInvoice"
                element={<IncomingFakturaTable />}
              /> */}
              <Route path="/outgoingInvoice" element={<FakturaTable />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
