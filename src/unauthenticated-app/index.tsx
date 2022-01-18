import { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登陆" : "注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
