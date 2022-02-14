import { Form, Input } from "antd";

import { useAuth } from "context/auth-context";
import { useDispatch } from "react-redux";
import { loginThunk } from "store/auth.slice";
import { useAsync } from "utils/use-async";

import { LongButton } from "./";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const dispatch = useDispatch();

  const handleSubimit = async (values: {
    username: string;
    password: string;
  }) => {
    // dispatch(loginThunk(values))
    await run(login(values)).catch(onError);
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
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
