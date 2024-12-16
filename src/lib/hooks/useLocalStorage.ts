import React, { SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T )
  : readonly [T, React.Dispatch<SetStateAction<T>>] => {

  const [value, setValue] = useState<T>(() => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [ value, setValue] as const;
};
