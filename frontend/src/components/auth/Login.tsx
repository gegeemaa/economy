import { Button, Form, Input, type FormProps } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { fetchLogin } from "../../util/http";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Container = styled.div`
  margin: auto;
  min-height: 80vh;
  display: flex;
  max-width: 1098px;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
`;

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "admin",
    password: "admin",
  };

  useEffect(() => {
    const isAuthenticaed = localStorage.getItem("user");
    if (isAuthenticaed) {
      navigate("/body");
    }
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    fetchLogin(values)
      .then((data) => {
        if (data.token) {
          type User = {
            userToken: string;
            userName: string;
          };
          const user: User = {
            userToken: data.token,
            userName: values.username!,
          };
          const userString = JSON.stringify(user);
          localStorage.setItem("user", userString);
          window.location.reload();
          navigate("/body");
        }
        console.log("userToken:  ", data.token);
      })
      .catch((e) => {
        console.log("Login hiih aldaa garlaa", e);
      });
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>Login</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
export default Login;
