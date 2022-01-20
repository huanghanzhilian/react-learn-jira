import { Form, Input } from "antd";

import { useAuth } from "context/auth-context";

import { LongButton } from "./";
const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubimit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubimit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
