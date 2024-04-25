import React from "react";
import { Layout, Menu, theme } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import InvoiceTable from "../InvoiceTable";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

const { Content, Sider } = Layout;
const menuDataOriginal = [
  {
    label: "Invoice",
    icon: AccountBookOutlined,
    children: [
      { label: "Outgoing Invoices", linkcomponent: "/outgoingInvoice" },
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

export default function Body() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  return (
    <Layout>
      <Sider
        width={200}
        style={{ background: colorBgContainer }}
        breakpoint="sm"
        collapsedWidth="0"
      >
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
          <InvoiceTable />
        </Content>
      </Layout>
    </Layout>
  );
}
