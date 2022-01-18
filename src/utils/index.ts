import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// export const useArray = <V>(value: V) => {
//   const [personValue, setPersonValue] = useState(value);
//   const results: {
//     value: V;
//     add: ({ name, age }: { name: string; age: number }) => void;
//     removeIndex: (index: number) => void;
//     clear: () => void;
//   } = {
//     value: personValue,
//     add: ({ name, age }) => {
//       // console.log({...{name, age}})
//       // @ts-ignore
//       setPersonValue([...personValue, { name, age }]);
//     },
//     removeIndex: (index) => {
//       // @ts-ignore
//       personValue.splice(index, 1);
//       // @ts-ignore
//       setPersonValue([...personValue]);
//     },
//     clear: () => {
//       // @ts-ignore
//       personValue.splice(0, personValue.length);
//       // @ts-ignore
//       setPersonValue([...personValue]);
//     },
//   };
//   return results;
// };

// 后面用范型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在数据变化后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
