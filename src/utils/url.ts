import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    // setSearchParams
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      // https://es6.ruanyifeng.com/#docs/iterator
      // Object.fromEntries()方法将键值对列表转换成一个对象。
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   return [
//     keys.reduce((prev, key) => {
//       return {...prev, [key]: searchParams.get(key) || ''}
//     }, {} as { [key in K]: string }),
//     setSearchParams
//   ] as const
// }

const a = ["a", 12, { ss: "1" }];
// const a: (string | number | {
//   ss: string;
// })[]

const b = ["a", 12, { ss: "1" }] as const;
// const b: readonly ["a", 12, {
//   readonly ss: "1";
// }]

const c = ["11"];
// const c: string[]

const d = ["11"] as const;
// const d: readonly ["11"]

const e = { a: 1 };

const f = { a: "1" } as const;
