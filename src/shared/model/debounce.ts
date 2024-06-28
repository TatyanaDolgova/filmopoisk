let timeout: ReturnType<typeof setTimeout>;

const debounce = <T extends (...args: any[]) => any>(func: T, ms: number) => {
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
};

export default debounce;
