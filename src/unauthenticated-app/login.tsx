import { FormEvent } from "react";

import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const { login, user } = useAuth();

  console.log(user);

  const handleSubimit = (event: FormEvent<HTMLFormElement>) => {
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubimit}>
      <div>
        <label htmlFor="usename">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登陆</button>
    </form>
  );
};

export default LoginScreen;