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

// js中的typeof，是在runtime时运行
// return typeof 1 === 'number'

// ts 中的typeof 是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
// typeof 传入一个变量， http 把他的类型提取出来
// <typeof http>代表着类型，这里是函数类型
// Parameters的作用是，给他传染一个函数类型。Parameters他能读出参数类型
// Utility type 的作用是，通过范型给他传入一个其他类型 然后Utility type对这个类型进行某种操作

// 假设我有一个person类型

// type Person = {
//   name: string,
//   age: number
// }

// 如果我不知道他的名字和年龄怎么办
// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
// const xiaoming:Person = {
//   name: 'xiaoming'
// }

// 很简单

// type Person = {
//   name?: string,
//   age?: number
// }

// const xiaoming:Person = {}

// 但是很多时候我们不希望改变Person类型，有可能他是第三方的类型，或者我们不想影响代码整洁性，我们不能修改类型
// 我们该怎么办

type Person = {
  name: string;
  age: number;
};

const xiaoming: Partial<Person> = {};
// 这时候xiaoming可以没有名字和没有年龄

// 下面有个神秘人，我们不知道他的名字，但是知道年龄，一种类型只有年龄没有名字
// const shenmiren: Omit<Person, 'name'> = {
//   age: 1
// }

// 如果连age也不需要
const shenmiren: Omit<Person, "name" | "age"> = {};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO 讲解 TS 操作符 Utility Tyoes
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = "huang";
myFavoriteNumber = 7;
// Type '{}' is not assignable to type 'string | number'.
// myFavoriteNumber = {}

let jipengFavoriteNumber: string | number;

// myFavoriteNumber和jipengFavoriteNumber类型一样，如果要给他们增加类型，需要一个个修改

// 将类型抽象出来

// 类型别名
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = 1;

// 类型别名在很多情况下可以和interface互换

// 1 他们的区别在于 联合类型 interface做不到
// type FavoriteNumber = string | number

// 2 交叉类型
// type FavoriteNumber = string & number

// 类型别名，interface 在这种情况下没法替代type
// type FavoriteNumber = string | number
// let roseFavoriteNumber: FavoriteNumber = 1

// interface 也没法实现Utility type

// interface Person {
//   name: string
// }

// type Person = { name: string }

// const xiaoming: Person = {name: 'xiaoming'}
