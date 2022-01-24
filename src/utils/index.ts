import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 页面加载时： oldTitle === 旧title 'React App'
  const oldTitle = useRef(document.title).current;

  // 加载后： oldTitl === 新title
  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect return 回调函数，会在卸载执行
  useEffect(() => {
    return () => {
      // 如果不指定依赖，读到的就是旧title
      document.title = oldTitle;
    };
  }, [keepOnUnmount, oldTitle]);
};
