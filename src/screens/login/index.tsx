import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      console.log(response);
    });
  };

  const handleSubimit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event.currentTarget);
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    console.log(username);
    console.log(password);
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
