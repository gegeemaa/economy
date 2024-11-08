import { useEffect, useState } from "react";
import { Button, Layout, Popover } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconProfile from "./util/icon-profile.svg";
import Tooltip from "./common/tooltip";
import { BASE_COLOR } from "./common/index";
import Login from "./components/auth/Login";
import Body from "./components/layout/Body";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const { Header } = Layout;

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

const MainLayout = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUsername(JSON.parse(localStorage.getItem("user")!).userName);
      setAuth(true);
      navigate("body");
    }
  }, []);

  const onClickLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };
  const onClickLoginOut = () => {
    setAuth(false);
    setUsername("");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout style={{ padding: 0, margin: 0 }}>
      <div className="demo-logo" />
      <HeaderStyled>
        {/* <Tooltip text={name ? `Hello, ${name}` : ""}> */}
        {/* <div>
          <Link to={"/body"} style={{ color: "white" }}>
            Body
          </Link>
        </div>
        <div>
          <Link to={"/login"} style={{ color: "white" }}>
            Login
          </Link>
        </div> */}

        <Tooltip text={username ? `Hello, ${username}` : ""}>
          <Popover
            placement="bottomRight"
            open={menuOpen}
            content={
              isAuth ? (
                <ColumnLayout>
                  <Button onClick={onClickLoginOut}>Logout</Button>
                </ColumnLayout>
              ) : (
                <Button onClick={onClickLogin}>Log in</Button>
              )
            }
            onOpenChange={setMenuOpen}
            trigger="click"
          >
            <Profile src={iconProfile} alt={"profile"} />
          </Popover>
        </Tooltip>
      </HeaderStyled>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/body" element={<Body />} />
          <Route path="/incomingInvoice" element={<Body />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default MainLayout;
