import { FormEvent } from "react";
import { Form, Input, Button } from "antd";

import { useAuth } from "context/auth-context";

const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubimit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubimit}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
