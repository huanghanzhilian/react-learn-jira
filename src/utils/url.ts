import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [setSearchParams]
    ),
    setSearchParams,
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
