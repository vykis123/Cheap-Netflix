import { useEffect, useState } from "react";

export const useDebounceValue = (value, delay = 500) => {
  /*
  useEffect(() => clearTimeout(handler.current), []);
  console.log("trigered");

  return (args) => {
    clearTimeout(handler.current);
    handler.current = window.setTimeout(() => fn(args), delay);
  };
*/

  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};
