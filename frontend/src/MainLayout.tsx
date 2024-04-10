import React, { useState } from "react";
import { AccountBookOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Popover, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import FakturaTable from "./components/FakturaTable";
import styled from "styled-components";
import { useSelector } from "react-redux";
import iconProfile from "./util/icon-profile.svg";
import Tooltip from "./common/tooltip";
import { BASE_COLOR } from "./common/index";

const { Content, Sider, Header } = Layout;

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
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Profile = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
`;
export const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: right;
  background: ${BASE_COLOR};
  max-height: 50;
  align-items: center;
  padding-right: 20;
`;

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

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const authState = useSelector((state: RootState) => state.auth);
  // const { name, profileUrl, isAuthenticated };
  const isAuthenticated = true;
  const profileUrl = "";

  const onClickLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <Layout style={{ padding: 0, margin: 0 }}>
      <HeaderStyled>
        {/* <Tooltip text={name ? `Hello, ${name}` : ""}> */}
        <Tooltip text="Hello Gerelmaa">
          <Popover
            placement="bottomRight"
            open={menuOpen}
            content={
              isAuthenticated ? (
                <ColumnLayout>
                  {/* <Logout /> */}
                  Logout
                </ColumnLayout>
              ) : (
                <Button onClick={onClickLogin}>Log in</Button>
              )
            }
            onOpenChange={setMenuOpen}
            trigger="click"
          >
            {/* <Profile src={profileUrl || iconProfile} alt={"profile"} /> */}
            <Profile src={profileUrl || iconProfile} alt={"profile"} />
          </Popover>
        </Tooltip>
      </HeaderStyled>
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
