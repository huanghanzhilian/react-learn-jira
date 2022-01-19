import { useState } from "react";

import { Card, Button } from "antd";

import RegisterScreen from "./register";
import LoginScreen from "./login";
const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button type="primary" onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登陆" : "注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
