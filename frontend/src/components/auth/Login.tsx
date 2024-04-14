import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { AppDispatch } from "../../redux/store";
import { loginThunk } from "../../redux/authSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(loginThunk(values));
    console.log("Success:", values);
  };
  return (
    <Container>
      <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>Login via</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
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

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
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
