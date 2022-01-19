import qs from "qs";

import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toLocaleUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在状态不为2XX的时候会抛出异常
  // 在fetch里，服务端返回的异常状态catch不会抛出异常，只有在断网的或者链接失败会触发catch
  // 所以需要手动Promise.reject
  return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登陆" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO 讲解 TS 操作符 Utility Tyoes
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// Utility type 的作用是，通过范型给他传入一个其他类型 然后Utility type对这个类型进行某种操作

type Person = {
  name: string;
  age: number;
};
const xiaoming: Partial<Person> = {};

// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// type 类型别名
// 定义 类型别名 Partial
// <T>传入一个范型 进行操作
// {} 返回一个新的类型 这个类型由两个部分组成 一个是键，一个是值
// key： [P in keyof T] keyof把对象类型的键值取出来形成一个联合类型
// type PersonKeys = keyof Person // type PersonKeys = "name" | "age"
// P 定义范型P 遍历 "name" | "age"联合类型
// ? 作为可先的键
// T[P] 是值

// Omit 的实现
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Exclude 排除传入到联合类型，Pick摘出剩下的类型 等于要忽略的类型合集
const shenmiren: Omit<Person, "name"> = { age: 1 };

// Pick 使用
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
type PersonOnlyName = Pick<Person, "name">;
// 同等于
// type PersonOnlyName = {
//   name: string;
// }

// Exclude 使用
// type Exclude<T, U> = T extends U ? never : T;
type PersonKeys = keyof Person;
type Age = Exclude<PersonKeys, "name">;

// PersonKeys == "name" | "age"联合类型 U 匹配到返回never 排除了name
// 所以type Age = "age"
